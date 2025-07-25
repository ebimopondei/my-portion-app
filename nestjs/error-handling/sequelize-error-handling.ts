import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from 'express'
import { LoggerService } from "src/logger/logger.service";
import { DatabaseError, BaseError, UniqueConstraintError, ValidationError, ForeignKeyConstraintError, TimeoutError, ConnectionError, HostNotFoundError, HostNotReachableError, AssociationError, InstanceError } from 'sequelize'

@Catch(Error)
export class SequelizeExceptionFilter implements ExceptionFilter {
    
    constructor(private readonly loggerService: LoggerService, private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: Error, host: ArgumentsHost):void {
        
        const { httpAdapter } = this.httpAdapterHost

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        if (exception instanceof UniqueConstraintError) {
      const uniqueFields = exception.errors.map((e) => e.path).join(', ');
      res.status(409).json({ status: 'fail', statusCode: 409,  message: `The provided value for ${uniqueFields} already exists.` });
      return; 
    } else if (exception instanceof ForeignKeyConstraintError) {
      res.status(422).json({ status: 'fail', statusCode: 422,  message: `Failed due to a foreign key constraint violation in ${exception.table} table` });
      return; 
    } else if (exception instanceof TimeoutError) {
      res.status(408).json({ status: 'fail', statusCode: 408,  message: 'The database operation timed out.' });
      return; 
    } else if (exception instanceof ValidationError) {
      if(exception.errors[0].validatorName == 'isIn'){
        res.status(408).json({ status: 'fail', statusCode: 503,  message: `Unknown unit type: ${exception.errors[0].value}` });
      }else {
        const uniqueFields = exception.errors.map( (e) => e.path).join(', ');
        res.status(408).json({ status: 'fail', statusCode: 503,  message: `${uniqueFields} cannot be null`  });
      }
      
      return; 
    } else if (exception instanceof DatabaseError) {
        this.loggerService.log(exception.parent.message)
        res.status(400).json({ status: 'fail', statusCode: 400,  message: exception.parent.message });
      return; 
    }  else if (
      exception instanceof ConnectionError ||
      exception instanceof HostNotFoundError ||
      exception instanceof HostNotReachableError
    ) {
      res.status(503).json({ status: 'fail', statusCode: 503,  message: 'Could not connect to the database. Please check your connection.' });
      return;
    } else if (exception instanceof AssociationError || exception instanceof InstanceError) {
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'An error occurred with the data or its relationships.' });
      return;
    } else if (exception instanceof AssociationError || exception instanceof InstanceError) {
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'An error occurred with the data or its relationships.' });
      return;
    } else if (exception instanceof BaseError) {
      console.log('BaseError:', exception);
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'unkn' }); 
      return;
    }


    res.status(400).json( { message: exception.message})
        return 
    }
}
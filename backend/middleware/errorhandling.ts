import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/error";
import { AssociationError,  BaseError, ConnectionError, DatabaseError, ForeignKeyConstraintError, HostNotFoundError, HostNotReachableError, InstanceError, TimeoutError, UniqueConstraintError } from 'sequelize'

export const databaseErrorHandler = (error:CustomError, req:Request, res:Response, next:NextFunction) => {
    console.log(error.name)
    if (error instanceof UniqueConstraintError) {
      const uniqueFields = error.errors.map((e) => e.path).join(', ');
      res.status(409).json({ status: 'fail', statusCode: 409,  message: `The provided value for ${uniqueFields} already exists.` });
      return; 
    } else if (error instanceof ForeignKeyConstraintError) {
      res.status(422).json({ status: 'fail', statusCode: 422,  message: `Failed due to a foreign key constraint violation in ${error.table} table` });
      return; 
    } else if (error instanceof DatabaseError) {
      console.error('Sequelize Database Error:', error.message, error.sql);
      if (error.parent) {
        console.error('Underlying Database Error:', error.parent);
      }
      res.status(500).json({ status: 'fail', statusCode: 503,  message: 'A database error occurred. Please try again later.' });
      return;
    } else if (error instanceof TimeoutError) {
      res.status(408).json({ status: 'fail', statusCode: 503,  message: 'The database operation timed out.' });
      return; 
    } else if (
      error instanceof ConnectionError ||
      error instanceof HostNotFoundError ||
      error instanceof HostNotReachableError
    ) {
      res.status(503).json({ status: 'fail', statusCode: 503,  message: 'Could not connect to the database. Please check your connection.' });
      return;
    } else if (error instanceof AssociationError || error instanceof InstanceError) {
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'An error occurred with the data or its relationships.' });
      return;
    } else if (error instanceof BaseError) {
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'An unexpected database error occurred.' }); 
      return;
    }
  
    // If the error is not a Sequelize error, pass it on to the next error handler
    next(error);
  };

export const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const error: CustomError = new Error(`Cannot ${req.method} ${req.originalUrl}`) as CustomError;
    error.statusCode = 404;
    error.status = 'fail';
    next(error); // Pass to error handler
};

export const globalErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) =>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'fail',
    res.status(error.statusCode).json( {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message, 
        name: error.name
    })
}
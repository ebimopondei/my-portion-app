
import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { ZodError, z  } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}
  
  transform(value: unknown, _: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestException(`Error in: ${error.issues.map( (e) => e.path).join(', ')}`);

        }

        throw error
    }
  }
}

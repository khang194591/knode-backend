import { BadRequestException, ValidationError } from '@nestjs/common';
import { Request } from 'express';

type DataError = {
  [key: string]: { [key: string]: string } | null;
};

export function extractToken(request: Request): Nullable<string> {
  return request.headers.authorization?.split(' ')[1] || null;
}

export function fromValidationErrors(errors: ValidationError[]) {
  const data: DataError = {};

  const parseErrors = (
    errs: ValidationError[],
    result: DataError,
    parentProperty?: string,
  ): void => {
    errs.forEach((error) => {
      const property = parentProperty
        ? `${parentProperty}.${error.property}`
        : error.property;
      if (error.constraints) {
        result[property] = error.constraints;
      } else if (error.children?.length) {
        parseErrors(error.children, result, property);
      }
    });
  };

  parseErrors(errors, data);

  return new BadRequestException({ message: 'error.validation', data });
}

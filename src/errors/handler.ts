import { Messages } from './../utils/v1/ConstantsMessages';
import { CustomError } from './CustomError';
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}


export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      if (err.path) errors[err.path] = err.errors;
    });

    return response.status(httpStatus.BAD_REQUEST).json({ message: Messages.Validate.VALIDATION_ERROR, errors });
  }

  if (error instanceof QueryFailedError) {
    return response.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof CustomError) {
    return response.status(error.status).json({
      message: error.message
    })
  }

  console.error(error);

  return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro interno do servidor " });
};

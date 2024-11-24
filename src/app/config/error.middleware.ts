import { NextFunction, Request, Response } from 'express'

//error interface
interface CustomError extends Error {
  statusCode?: number,
  errors?: unknown
}

// global error handler
const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    success: false,
    error: {
      name: err.name,
      errors: err.errors,
    },
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })

  next()
}

export default globalErrorHandler

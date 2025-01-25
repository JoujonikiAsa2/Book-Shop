import { NextFunction, Request, Response } from "express"
import { RequestHandler } from "express-serve-static-core"

//try catch handler
export const asyncWrapper = (fn:RequestHandler) =>{
    return (req: Request, res: Response, next:NextFunction) =>{
        Promise.resolve(fn(req, res, next)).catch((error)=>next(error))
    }
}
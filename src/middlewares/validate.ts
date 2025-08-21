import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(DtoClass, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    next();
  };
};

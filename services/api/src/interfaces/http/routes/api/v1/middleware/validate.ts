import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ZodSchema } from 'zod';

export function validate(schema: ZodSchema): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });
      return next();
    } catch (e: any) {
      res.status(400).json({ errors: e.errors });
    }
  };
}

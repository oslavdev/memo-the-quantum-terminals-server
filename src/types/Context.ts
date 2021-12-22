import { Request, Response } from "express";

declare module "express-session" {
  interface Session {
    userId: string | number;
  }
}

export interface Context {
  req: Request;
  res: Response;
}

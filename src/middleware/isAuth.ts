import { MiddlewareFn } from "type-graphql";
import { Context } from "@/types/Context";
import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}
export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenticated");
  }

  return next();
};

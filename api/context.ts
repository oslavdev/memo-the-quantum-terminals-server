import { PrismaClient } from "@prisma/client"
import * as JWT from 'jsonwebtoken'
import { db } from './db'
import * as TokenHelper from "./utils/token"

export interface Context {
  db: PrismaClient
  userId: string 
}
export const context = {
  db
}

export const createContext = (ctx: any): Context => {

  let userId = null;
  const Authorization = ctx.req.get('Authorization')
  const token = Authorization.replace('Bearer ', '')
  const verifiedToken = JWT.verify(token, TokenHelper.ACCESS_JWT_SECRET) as TokenHelper.Token

  if (verifiedToken.userId){
    userId = verifiedToken.userId
  } 

  return {
    ...ctx,
    db,
    userId
  }
}

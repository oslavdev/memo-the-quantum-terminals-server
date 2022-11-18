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

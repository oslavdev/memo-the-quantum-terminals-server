import { v4 } from "uuid";
import Redis from "ioredis";
import { confirmUserPrefix } from "../constants/redisPrefixes";

const redis = new Redis(process.env.REDIS_URL);

export const createConfirmationUrl = async (userId: number | string) => {

  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  const BASE_URL = process.env.BASE_URL || 'localhost:3000'
  const protocol = process.env.PROTOCOL || 'http'

  return `${protocol}://${BASE_URL}/user/confirm?${token}`;
};

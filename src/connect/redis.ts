import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";

export const RedisStore = connectRedis(session); // connect redis store
export const redis = new Redis(process.env.REDIS_URL);

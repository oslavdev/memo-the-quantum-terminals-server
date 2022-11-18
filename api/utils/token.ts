import * as JWT from "jsonwebtoken";

export interface Token {
  userId: string;
  type: string;
  timestamp: number;
}

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ACCESS_TOKEN_EXPIRY = 7 * 24 * 60 * 60;
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET || "SuperSecretForJWTDeafult231@!";

export const generateAccessToken = (userId: string): string => {
  const accessToken = JWT.sign(
    {
      userId,
      type: ACCESS_TOKEN,
      timestamp: Date.now(),
    },
    ACCESS_JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
  return accessToken;
};

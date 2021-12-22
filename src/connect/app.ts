import path from "path";
import express from "express";
import { RedisStore, redis } from "./redis";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

export const AppApply = (app: any) => {
  app.use("/images", express.static(path.join(__dirname, "../../images")));
  app.set("trust proxy", 1);
  app.use(
    cors({
      credentials: true, // Enables HTTP cookies over CORS
      origin:
        process.env.NODE_ENV === "production"
          ? "https://q-terminals.com"
          : process.env.CLIENT_URL,
    })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        domain: undefined,
      },
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.disable("x-powered-by");
  app.use(compression()); //compression
  app.use(morgan("common")); //http request logger
};

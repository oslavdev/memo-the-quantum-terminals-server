import { createConnection } from "typeorm";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import express from "express";
import ApolloServerConnect from "./connect/apollo";
import { AppApply } from "./connect/app";
import winston from "winston";
import { createAdminAccount } from "./utils/createAdminAccount";

const server = async () => {


  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entity/*")],
    synchronize: true,
  }); //connect database

  await createAdminAccount();

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  // TODO use AWS bucket to store images
  existsSync(path.join(__dirname, "../uploads")) ||
   mkdirSync(path.join(__dirname, "../uploads")); //set up save folder for files

  const app = await express(); //init express app
  await AppApply(app); //apply middlewares

  ApolloServerConnect.applyMiddleware({ app, cors: false }); //apply middleware app to Apollo Server


  const PORT = process.env.PORT || 7100;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  });
};

server().catch((err) => {
  console.error(err);
});

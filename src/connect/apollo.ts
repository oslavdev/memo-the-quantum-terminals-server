import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../resolvers/root";
import { typeDefs } from "../resolvers/typeDefs";
import { redis } from "./redis";

const ApolloServerConnect = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({
    req,
    res,
    redis,
  }),
});

export default ApolloServerConnect;

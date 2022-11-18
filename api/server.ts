import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware'
import { context } from './context';
import { schema } from './schema';
import { permissions } from './utils/shield';

export const apolloServer = new ApolloServer({ 
    schema: applyMiddleware(schema, permissions), 
    context: context
});

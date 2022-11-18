import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {ApolloServer} from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';

import http from 'http';
import { context, Context } from './context';
import { schema } from './schema';
// import { permissions } from './utils/shield';
import { json } from 'body-parser';
import {customLogger} from "./plugins/custom-logger"

interface ServerContext extends Context {
   token?: String;
}

interface Server {
  start: () => void
}

async function startApolloServer() {
  
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<ServerContext>({ 
    schema, 
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginSchemaReporting(),
      ApolloServerPluginInlineTrace({
        includeErrors: { transform: err => err },
      }),
      customLogger
    ],
  }) as Server;

  // Required logic for integrating with Express
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token, ...context }),
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: { policy: 'no-referrer' },
      noSniff: true,
    })
  );

  app.disable('x-powered-by');

  app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy!');
  })

  const PORT = process.env.PORT || 4000;
  await new Promise((resolve:any) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer()

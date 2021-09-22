import path from 'path'
import dotenv from 'dotenv';
dotenv.config({path: path.resolve(__dirname,'../.env')})
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

import schema from './schema';
import resolvers from './resolvers';

const PORT = process.env.PORT || 8000

const startServer = async () => {
  const app = express();

  app.use(express.static(path.resolve(__dirname,'../public')))
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
  })

  await server.start();
  server.applyMiddleware({app});

  app.listen(PORT,()=>console.log(`Shh Server\nStarted at http://localhost:${PORT}`));
}

startServer()
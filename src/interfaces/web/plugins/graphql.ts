import { Server } from 'http';
import path from 'path';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { buildSchema } from 'type-graphql';

import { HelloResolver } from '../resolvers/hello.resolve';
import { UserResolver } from '../resolvers/user.resolve';

interface MyContext {
  token?: string;
}

export async function createApolloServer(httpServer: Server) {
  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
    emitSchemaFile: {
      path: path.join(path.resolve(__dirname), '../schema/schema.graphql'),
      sortedSchema: true,
    },
  });

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  return server;
}

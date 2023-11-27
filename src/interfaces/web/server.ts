import http from 'http';

import { expressMiddleware } from '@apollo/server/express4';
import compress from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import errorMiddleware from './middleware/error-handler';
import { createApolloServer } from './plugins/graphql';
import swaggerSpecs from './plugins/swagger';
import { Router } from './router';

export default class Server {
  public port: number;
  public host: string;
  public app: express.Application;

  private static _instance: Server;
  private readonly httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 5000;
    this.host = process.env.HOST || 'localhost';

    this.httpServer = http.createServer(this.app);

    this.initMiddleware();
    this.initRouters();

    this.errorHandling();
  }

  public static get instance(): Server {
    return this._instance || (this._instance = new this());
  }

  public async start(callback?: () => void): Promise<void> {
    if (!callback) {
      console.info(`🌐 Web Server: http://${this.host}:${this.port}\n`);
    }

    this.httpServer.listen(this.port, callback);
  }

  private initMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    const isDevelopment = process.env.NODE_ENV === 'development';

    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: !isDevelopment,
        contentSecurityPolicy: !isDevelopment,
        frameguard: { action: 'deny' },
        xssFilter: true,
        noSniff: true,
        hidePoweredBy: true,
      }),
    );

    this.app.use(morgan('dev'));
    this.app.use(compress());
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );
    this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

    createApolloServer(this.httpServer)
      .then(server => {
        this.app.use(
          '/',
          cors({
            origin: '*', // Para propósitos de desarrollo; especifica los dominios en producción
            credentials: true,
          }),
          express.json(),
          expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
          }),
        );
      })
      .catch(e => console.log(e));
  }

  private errorHandling() {
    this.app.use(errorMiddleware);
  }

  private initRouters(): void {
    Router().forEach(({ router }) => this.app.use('/', router));
  }
}

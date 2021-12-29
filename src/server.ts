/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import routes from './routes/routes';
import utilsRoutes from './routes/utils.routes';
import AppError from './errors/AppError';

import './database';
import './container';

const server = express();

server.use(express.json());
server.use('/', utilsRoutes);
server.use('/', routes);

server.use(errors());

server.use((err: Error, _req: Request, _res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return _res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return _res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

server.listen(3333, () => {
  console.log('🚀️ Servidor iniciado na porta 3333');
});

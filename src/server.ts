import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';
import './container';

const server = express();

server.use(express.json());
server.use(routes);


server.listen(3333, () => {
  console.log('🚀️ Servidor iniciado na porta 3333');
});
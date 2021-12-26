import express from 'express';

import './database';

const server = express();

server.listen(3333, () => {
  console.log('🚀️ Servidor iniciado na porta 3333');
});
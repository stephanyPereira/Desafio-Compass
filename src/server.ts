import express from 'express';

const server = express();

server.listen(3333, () => {
  console.log('🚀️ Servidor iniciado na porta 3333');
});
import { Router } from 'express';
import SwaggerUI from 'swagger-ui-express';
import { version } from '../../package.json';
import * as swaggerDocs from '../docs/swagger.json';

const router = Router();

router.get('/version', (_req, res) => {
  res.status(200).json({ version });
});

router.get('/healthcheck', (_req, res) => res.status(200).json({ status: 'UP' }));

router.use('/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs, {
  swaggerOptions: {
    plugins: [{
      statePlugins: {
        spec: {
          wrapSelectors: {
            allowTryItOutFor: () => () => false,
          },
        },
      },
    }],
  },
}));

export default router;

/* eslint-disable semi */
import { Router, Request, Response } from 'express';

import * as swaggerDocs from '../docs/swagger.json';
import SwaggerUI from 'swagger-ui-express';
import Postman from 'openapi-to-postmanv2';

import { version } from '../../package.json';


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

router.use('/docs/postman', (req: Request, res: Response) => {
  const options = {
    folderStrategy: 'Tags',
    requestParametersResolution: 'Example',
    disableOptionalParameters: true,
  }

  Postman.convert({ type: 'json', data: swaggerDocs }, options, (err, result) => {
    if (err) {
      console.log(err.message, err)
      return res.status(500).json(err)
    }
    if (result.result) {
      res.status(200)
      const collection = result.output[0].data
      collection.variable = [{
        type: 'string',
        value: `${req.get('host')}`,
        key: 'baseUrl',
      }]
      return res.send(collection)
    }
    return res.status(500).send(`Não foi possível gerar a Collection: ${result.reason}`)
  })
});

export default router;

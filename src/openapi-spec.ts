import {ApplicationConfig} from '@loopback/core';
import {LoopbackRestConnectorApplication} from './application';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost',
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: false,
        servers: [{
          url: 'http://localhost:3000'
        }],
        endpointMapping: {
          'openapi.json': {version: '3.0.0', format: 'json'}
        }
      }
    },
  };
  const outFile = process.argv[2] ?? '';
  const app = new LoopbackRestConnectorApplication(config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

export const config = {
  name: 'openapi',
  connector: 'openapi',
  spec: 'openapi.json',
  validate: false,
  positional: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OpenapiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'openapi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.openapi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

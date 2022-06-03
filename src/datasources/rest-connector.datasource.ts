import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'RestConnector',
  connector: 'rest',
  baseURL: '$BASE_URL',
  operations: [
    {
      template: {
        method: 'POST',
        url: '/users',
        body: '{users:object}',
      },
      functions: {
        create: ['users'],
      },
    },
    {
      template: {
        method: 'GET',
        url: '/users?filter={filter}',
      },
      functions: {
        find: ['filter'],
      },
    },
    {
      template: {
        method: 'GET',
        url: '/users/{id}?filter={filter}',
      },
      functions: {
        findById: ['id', 'filter'],
      },
    },
    {
      template: {
        method: 'PATCH',
        url: '/users/{id}',
        body: '{users:object}',
      },
      functions: {
        updateById: ['id', 'users'],
      },
    },
    {
      template: {
        method: 'DELETE',
        url: '/users/{id}',
      },
      functions: {
        deleteById: ['id'],
      },
    },
    {
      template: {
        method: 'DELETE',
        url: '/users',
      },
      functions: {
        deleteAll: [],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestConnectorDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'RestConnector';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.RestConnector', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

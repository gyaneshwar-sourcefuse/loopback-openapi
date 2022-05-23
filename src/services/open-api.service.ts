import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OpenapiDataSource} from '../datasources';

export interface OpenApi {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  find(filter: unknown): Promise<unknown>;
  findById(id: string, filter: unknown): Promise<unknown>;
  updateById(id: string, body: unknown): Promise<void>;
  deleteById(id: string): Promise<void>;
  create(body: unknown): Promise<unknown>;
  deleteAll(): Promise<unknown>;
}

export class OpenApiProvider implements Provider<OpenApi> {
  constructor(
    // openapi must match the name property in the datasource json file
    @inject('datasources.openapi')
    protected dataSource: OpenapiDataSource = new OpenapiDataSource(),
  ) { }

  value(): Promise<OpenApi> {
    return getService(this.dataSource);
  }
}

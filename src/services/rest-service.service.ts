import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestConnectorDataSource} from '../datasources';

export interface RestService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  find(filter: any): Promise<any>;
  findById(id: string, filter: any): Promise<any>;
  updateById(id: string, body: any): Promise<void>;
  deleteById(id: string): Promise<void>;
  create(body: any): Promise<any>;
  deleteAll(): Promise<void>;
}

export class RestServiceProvider implements Provider<RestService> {
  constructor(
    // RestConnector must match the name property in the datasource json file
    @inject('datasources.RestConnector')
    protected dataSource: RestConnectorDataSource = new RestConnectorDataSource(),
  ) { }

  value(): Promise<RestService> {
    return getService(this.dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RestConnectorDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id, UsersRelations> {
  constructor(
    @inject('datasources.RestConnector') dataSource: RestConnectorDataSource
  ) {
    super(Users, dataSource);
  }
}

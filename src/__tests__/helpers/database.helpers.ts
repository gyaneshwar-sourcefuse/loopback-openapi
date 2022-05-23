import {UsersController} from '../../controllers';
import {RestConnectorDataSource} from '../../datasources';
import {Users} from '../../models';
import {RestServiceProvider} from '../../services';

const user = {
  "name": "Sama",
  "role": 1,
  "email": "sama@gmail.com"
}
export const RestServiceHelper = async () => {
  return new RestServiceProvider(new RestConnectorDataSource()).value();
}

export const UserControllerHelper = async () => {
  return new UsersController(await new RestServiceProvider(new RestConnectorDataSource()).value());
}


export const givenUserData = (data: Partial<Users>) => {
  return {...user, ...data}
}

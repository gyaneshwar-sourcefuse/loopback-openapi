import {expect} from '@loopback/testlab';
import {RestService} from '../../../services';
import {UserControllerHelper} from '../../helpers/database.helpers';


describe('UsersController(integration)', () => {

  let userController: RestService;
  const data = {
    "name": "Sama",
    "role": 1,
    "email": "sama@gmail.com"
  }

  before(async () => {
    userController = await UserControllerHelper();
    await userController.deleteAll();
  });


  it('should insert the user data', async () => {

    const user = await userController.create(data);
    expect(user).to.containEql(data);

  });

  it('should get the users list', async () => {
    const users = await userController.find({});
    expect(users.length).greaterThan(0)
  });

  it('should get users list by filter', async () => {
    const users = await userController.find({where: {role: 1}});
    expect(users.length).greaterThan(0)
  });

  it('should find user by id', async () => {
    const user = await userController.create(data);
    const found = await userController.findById(user.id, {});
    expect(user).to.deepEqual(found);
  });

  it('should delete user by id', async () => {
    const user = await userController.create(data);
    expect(user).to.containEql(data);
    const found = await userController.deleteById(user.id);
    expect(found).to.equal(undefined);
  });

  it('should update the user by id', async () => {
    const user = await userController.create(data);
    expect(user).to.containEql(data);
    await userController.updateById(user.id, {role: 2});
    const found = await userController.findById(user.id, {});
    expect(found.role).to.be.eql(2);
  })


})

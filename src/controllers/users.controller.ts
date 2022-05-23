import {inject} from '@loopback/core';
import {Filter, FilterExcludingWhere} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, response} from '@loopback/rest';
import {Users} from '../models';
import {RestService} from '../services';


export class UsersController {
  constructor(
    @inject('services.RestService')
    protected restService: RestService
  ) {

  }

  @post('/users')
  @response(200, {
    description: "Create new user",
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users)
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            exclude: ['id']
          })
        }
      }
    })
    users: Omit<Users, 'id'>
  ): Promise<Users> {
    return this.restService.create(users);
  }

  @get('/users', {
    responses: {
      description: 'Array of users',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Users, {includeRelations: true})
          }
        }
      }
    }
  })
  async find(
    @param.filter(Users) filter?: Filter<Users>
  ): Promise<Users[]> {

    let Filter = '{}';

    if (filter) {
      try {
        Filter = JSON.stringify(filter);
      } catch (error) {

      }
    }

    return this.restService.find(Filter);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Find one user',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true})
      }
    }
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(Users, {exclude: 'where'}) filter?: FilterExcludingWhere<Users>
  ): Promise<Users> {
    let Filter = '{}';

    try {
      Filter = JSON.stringify(filter);
    } catch (error) {

    }
    return this.restService.findById(id, Filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User update'
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true})
        }
      }
    })
    users: Users
  ): Promise<void> {
    return this.restService.updateById(id, users);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User delete'
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    return this.restService.deleteById(id);
  }

  @del('/users', {
    responses: {
      '200': {
        description: 'Delete all users',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users)
          }
        }
      }
    }
  })
  async deleteAll(): Promise<void> {
    return this.restService.deleteAll();
  }
}

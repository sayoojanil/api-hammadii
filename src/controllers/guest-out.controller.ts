import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { GuestOut } from '../models';
import { GuestOutRepository } from '../repositories';

export class GuestOutController {
  constructor(
    @repository(GuestOutRepository)
    public guestOutRepository: GuestOutRepository,
  ) {}

  @post('/add/guestout', {
    responses: {
      '200': {
        description: 'GuestOut model instance',
        content: {'application/json': {schema: getModelSchemaRef(GuestOut)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GuestOut, {
            title: 'NewGuestOut',
            exclude: ['id'],
          }),
        },
      },
    })
    guestOut: Omit<GuestOut, 'id'>,
  ): Promise<GuestOut> {
    return this.guestOutRepository.create(guestOut);
  }

  @get('/get/guestout', {
    responses: {
      '200': {
        description: 'Array of GuestOut model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GuestOut, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GuestOut) filter?: Filter<GuestOut>,
  ): Promise<GuestOut[]> {
    return this.guestOutRepository.find(filter);
  }

  @get('get/guestout/{id}', {
    responses: {
      '200': {
        description: 'GuestOut model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GuestOut, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GuestOut, {exclude: 'where'}) filter?: FilterExcludingWhere<GuestOut>,
  ): Promise<GuestOut> {
    return this.guestOutRepository.findById(id, filter);
  }

  @patch('update/guestout/{id}', {
    responses: {
      '204': {
        description: 'GuestOut PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GuestOut, {partial: true}),
        },
      },
    })
    guestOut: GuestOut,
  ): Promise<void> {
    await this.guestOutRepository.updateById(id, guestOut);
  }

  @del('del/guestout/{id}', {
    responses: {
      '204': {
        description: 'GuestOut DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.guestOutRepository.deleteById(id);
  }

  @get('get/guestout/count', {
    responses: {
      '200': {
        description: 'GuestOut model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GuestOut) where?: Where<GuestOut>,
  ): Promise<Count> {
    return this.guestOutRepository.count(where);
  }
}

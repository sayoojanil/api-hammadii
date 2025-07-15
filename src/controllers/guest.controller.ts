import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Guest} from '../models';
import {GuestRepository} from '../repositories';

export class GuestController {
  constructor(
    @repository(GuestRepository)
    public guestRepository: GuestRepository,
  ) {}

  @post('/add/guests', {
    responses: {
      '200': {
        description: 'Guest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Guest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Guest, {
            title: 'NewGuest',
            exclude: ['id'],
          }),
        },
      },
    })
    guest: Omit<Guest, 'id'>,
  ): Promise<Guest> {
    return this.guestRepository.create(guest);
  }

  @get('/getDetailsof/guests/count', {
    responses: {
      '200': {
        description: 'Guest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Guest) where?: Where<Guest>,
  ): Promise<Count> {
    return this.guestRepository.count(where);
  }

  @get('/getDetailsof/guests', {
    responses: {
      '200': {
        description: 'Array of Guest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Guest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Guest) filter?: Filter<Guest>,
  ): Promise<Guest[]> {
    return this.guestRepository.find(filter);
  }

  @get('/getDetailsof/guests/{id}', {
    responses: {
      '200': {
        description: 'Guest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Guest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Guest, {exclude: 'where'}) filter?: FilterExcludingWhere<Guest>,
  ): Promise<Guest> {
    return this.guestRepository.findById(id, filter);
  }

  @put('/getDetailsof/guests/{id}', {
    responses: {
      '204': {
        description: 'Guest PUT success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Guest, {partial: true}),
        },
      },
    })
    guest: Guest,
  ): Promise<void> {
    await this.guestRepository.updateById(id, guest);
  }

  @del('/delete/guests/{id}', {
    responses: {
      '204': {
        description: 'Guest DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.guestRepository.deleteById(id);
  }
}

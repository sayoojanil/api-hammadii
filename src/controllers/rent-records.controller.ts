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
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import { RentRecord } from '../models';
import { RentRecordRepository } from '../repositories';

export class RentRecordController {
  constructor(
    @repository(RentRecordRepository)
    public rentRecordRepository: RentRecordRepository,
  ) {}

  @post('/rent-records')
  @response(200, {
    description: 'RentRecord model instance',
    content: { 'application/json': { schema: getModelSchemaRef(RentRecord) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RentRecord, {
            title: 'NewRentRecord',
            exclude: ['id'],
          }),
        },
      },
    })
    rentRecord: Omit<RentRecord, 'id'>,
  ): Promise<RentRecord> {
    return this.rentRecordRepository.create(rentRecord);
  }

  @get('/rent-records/count')
  @response(200, {
    description: 'RentRecord model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(RentRecord) where?: Where<RentRecord>,
  ): Promise<Count> {
    return this.rentRecordRepository.count(where);
  }

  @get('/rent-records')
  @response(200, {
    description: 'Array of RentRecord model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RentRecord, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(RentRecord) filter?: Filter<RentRecord>,
  ): Promise<RentRecord[]> {
    return this.rentRecordRepository.find(filter);
  }

  @get('/rent-records/{id}')
  @response(200, {
    description: 'RentRecord model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RentRecord, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RentRecord, { exclude: 'where' }) filter?: FilterExcludingWhere<RentRecord>,
  ): Promise<RentRecord> {
    return this.rentRecordRepository.findById(id, filter);
  }

  @patch('/rent-records/{id}')
  @response(204, {
    description: 'RentRecord PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RentRecord, { partial: true }),
        },
      },
    })
    rentRecord: RentRecord,
  ): Promise<void> {
    await this.rentRecordRepository.updateById(id, rentRecord);
  }

  @del('/rent-records/{id}')
  @response(204, {
    description: 'RentRecord DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rentRecordRepository.deleteById(id);
  }
}

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
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Guest } from '../models';
import { GuestRepository } from '../repositories';

export class GuestController {
  constructor(
    @repository(GuestRepository)
    public guestRepository: GuestRepository,
  ) {}

  @post('/add/guests')
  @response(200, {
    description: 'Guest model instance',
    content: { 'application/json': { schema: { 'x-ts-type': Guest } } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            'x-ts-type': Guest,
          },
        },
      },
    })
    guest: Omit<Guest, 'id'>,
  ): Promise<Guest> {
    // Validate input data
    if (!this.validateGuest(guest)) {
      throw new HttpErrors.BadRequest('Invalid guest data provided');
    }

    return this.guestRepository.create(guest);
  }

  @get('/getDetailsof/guests/count')
  @response(200, {
    description: 'Guest model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Guest) where?: Where<Guest>,
  ): Promise<Count> {
    return this.guestRepository.count(where);
  }

  @get('/getDetailsof/guests')
  @response(200, {
    description: 'Array of Guest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { 'x-ts-type': Guest },
        },
      },
    },
  })
  async find(
    @param.filter(Guest) filter?: Filter<Guest>,
  ): Promise<Guest[]> {
    return this.guestRepository.find(filter);
  }

  @get('/getDetailsof/guests/{id}')
  @response(200, {
    description: 'Guest model instance',
    content: {
      'application/json': {
        schema: { 'x-ts-type': Guest },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Guest, { exclude: 'where' }) filter?: FilterExcludingWhere<Guest>,
  ): Promise<Guest> {
    const guest = await this.guestRepository.findById(id, filter);
    if (!guest) {
      throw new HttpErrors.NotFound('Guest not found');
    }
    return guest;
  }

  @put('/getDetailsof/guests/{id}')
  @response(204, {
    description: 'Guest PUT success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: { 'x-ts-type': Guest },
        },
      },
    })
    guest: Guest,
  ): Promise<void> {
    // Validate input data
    if (!this.validateGuest(guest)) {
      throw new HttpErrors.BadRequest('Invalid guest data provided');
    }

    const existingGuest = await this.guestRepository.findById(id);
    if (!existingGuest) {
      throw new HttpErrors.NotFound('Guest not found');
    }

    await this.guestRepository.updateById(id, guest);
  }

  @del('/delete/guests/{id}')
  @response(204, {
    description: 'Guest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    const guest = await this.guestRepository.findById(id);
    if (!guest) {
      throw new HttpErrors.NotFound('Guest not found');
    }
    await this.guestRepository.deleteById(id);
  }

  private validateGuest(guest: Partial<Guest>): boolean {
    return (
      typeof guest.name === 'string' &&
      guest.name.length > 0 &&
      typeof guest.contact === 'string' &&
      /^\d{10}$/.test(guest.contact) &&
      typeof guest.email === 'string' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email) &&
      typeof guest.location === 'string' &&
      guest.location.length > 0 &&
      typeof guest.dob === 'string' &&
      !isNaN(new Date(guest.dob).getTime()) &&
      typeof guest.guardianName === 'string' &&
      guest.guardianName.length > 0 &&
      typeof guest.guardianContact === 'string' &&
      /^\d{10}$/.test(guest.guardianContact) &&
      typeof guest.emergencyContactName === 'string' &&
      guest.emergencyContactName.length > 0 &&
      typeof guest.emergencyContactRelation === 'string' &&
      guest.emergencyContactRelation.length > 0 &&
      typeof guest.emergencyContactNumber === 'string' &&
      /^\d{10}$/.test(guest.emergencyContactNumber) &&
      typeof guest.occupationCourse === 'string' &&
      guest.occupationCourse.length > 0 &&
      ['monthly', 'daily'].includes(guest.paymentCycle ?? '') &&
      typeof guest.amountPaid === 'number' &&
      guest.amountPaid >= 0 &&
      ['with-food', 'without-food'].includes(guest.foodPreference ?? '') &&
      ['joining-soon', 'currently-staying', 'already-left'].includes(guest.stayStatus ?? '') &&
      typeof guest.joinDate === 'string' &&
      !isNaN(new Date(guest.joinDate).getTime()) &&
      typeof guest.expectedDateFrom === 'string' &&
      !isNaN(new Date(guest.expectedDateFrom).getTime()) &&
      typeof guest.expectedDateTo === 'string' &&
      !isNaN(new Date(guest.expectedDateTo).getTime()) &&
      new Date(guest.expectedDateFrom ?? '') <= new Date(guest.expectedDateTo ?? '')
    );
  }
}

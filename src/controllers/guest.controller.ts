import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler, Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, post, put, del, param, requestBody, response} from '@loopback/rest';
import {Guest} from '../models';

export class GuestController {
  constructor(
    @inject('datasources.db') protected dataSource: juggler.DataSource,
  ) {
    this.guestRepository = new DefaultCrudRepository(Guest, this.dataSource);
  }

  private guestRepository: DefaultCrudRepository<Guest, typeof Guest.prototype.id>;

  @get('/getDetailsof/guests', {
    responses: {
      '200': {
        description: 'Array of Guest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Guest),
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
            exclude: ['id'],
          }),
        },
      },
    })
    guest: Omit<Guest, 'id'>,
  ): Promise<Guest> {
    // Validate input data
    if (!guest.name || !guest.contact || !guest.email || !guest.aadhar ||
        !guest.location || !guest.guardianName || !guest.guardianContact ||
        !guest.emergencyContactName || !guest.emergencyContactRelation ||
        !guest.emergencyContactNumber || !guest.occupationCourse ||
        !guest.paymentCycle || !['monthly', 'daily'].includes(guest.paymentCycle) ||
        !guest.foodPreference || !['with-food', 'without-food'].includes(guest.foodPreference) ||
        !guest.stayStatus || !['joining-soon', 'currently-staying', 'already-left'].includes(guest.stayStatus) ||
        !guest.joinDate || isNaN(new Date(guest.joinDate).getTime()) ||
        !/^\d{10}$/.test(guest.contact) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email) ||
        !/^\d{12}$/.test(guest.aadhar) ||
        !/^\d{10}$/.test(guest.guardianContact) ||
        !/^\d{10}$/.test(guest.emergencyContactNumber) ||
        guest.amountPaid < 0) {
      throw new Error('Invalid guest data provided');
    }

    return this.guestRepository.create(guest);
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
    // Validate input data
    if (guest.contact && !/^\d{10}$/.test(guest.contact)) {
      throw new Error('Invalid contact number');
    }
    if (guest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) {
      throw new Error('Invalid email address');
    }
    if (guest.aadhar && !/^\d{12}$/.test(guest.aadhar)) {
      throw new Error('Invalid Aadhar number');
    }
    if (guest.guardianContact && !/^\d{10}$/.test(guest.guardianContact)) {
      throw new Error('Invalid guardian contact number');
    }
    if (guest.emergencyContactNumber && !/^\d{10}$/.test(guest.emergencyContactNumber)) {
      throw new Error('Invalid emergency contact number');
    }
    if (guest.paymentCycle && !['monthly', 'daily'].includes(guest.paymentCycle)) {
      throw new Error('Invalid payment cycle');
    }
    if (guest.foodPreference && !['with-food', 'without-food'].includes(guest.foodPreference)) {
      throw new Error('Invalid food preference');
    }
    if (guest.stayStatus && !['joining-soon', 'currently-staying', 'already-left'].includes(guest.stayStatus)) {
      throw new Error('Invalid stay status');
    }
    if (guest.joinDate && isNaN(new Date(guest.joinDate).getTime())) {
      throw new Error('Invalid join date');
    }
    if (guest.amountPaid !== undefined && guest.amountPaid < 0) {
      throw new Error('Amount paid cannot be negative');
    }

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

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    forceId: false,
    mongodb: {
      collection: 'guests',
    },
  },
})
export class Guest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 100,
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^[0-9]{10}$',
      errorMessage: 'Contact must be a 10-digit number',
    },
  })
  contact: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      errorMessage: 'Invalid email format',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^[0-9]{12}$',
      errorMessage: 'Aadhar must be a 12-digit number',
    },
  })
  aadhar: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 100,
    },
  })
  location: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 100,
    },
  })
  guardianName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^[0-9]{10}$',
      errorMessage: 'Guardian contact must be a 10-digit number',
    },
  })
  guardianContact: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 100,
    },
  })
  occupationCourse: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
      maximum: 100,
      errorMessage: 'Discount must be between 0 and 100',
    },
  })
  discountGiven: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
      errorMessage: 'Amount paid cannot be negative',
    },
  })
  amountPaid: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['active', 'pending'],
      errorMessage: 'Payment status must be either active or pending',
    },
  })
  paymentStatus: string;

  @property({
    type: 'date',
    required: true,
  })
  joinDate: string;

  constructor(data?: Partial<Guest>) {
    super(data);
  }
}

export interface GuestRelations {
  // describe navigational properties here
}

export type GuestWithRelations = Guest & GuestRelations;

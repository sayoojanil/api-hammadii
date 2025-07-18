import { Entity, model, property } from '@loopback/repository';

@model()
export class Guest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;



  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
    required: true,
  })
  dob: string;

  @property({
    type: 'string',
    required: true,
  })
  guardianName: string;

  @property({
    type: 'string',
    required: true,
  })
  guardianContact: string;

  @property({
    type: 'string',
    required: true,
  })
  emergencyContactName: string;

  @property({
    type: 'string',
    required: true,
  })
  emergencyContactRelation: string;

  @property({
    type: 'string',
    required: true,
  })
  emergencyContactNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  occupationCourse: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['monthly', 'daily'],
    },
  })
  paymentCycle: string;

  @property({
    type: 'number',
    required: true,
  })
  amountPaid: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['with-food', 'without-food'],
    },
  })
  foodPreference: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['joining-soon', 'currently-staying', 'already-left'],
    },
  })
  stayStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  joinDate: string;

  @property({
    type: 'string',
    required: true,
  })
  expectedDateFrom: string;

  @property({
    type: 'string',
    required: true,
  })
  fileUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  expectedDateTo: string;

  constructor(data?: Partial<Guest>) {
    super(data);
  }
}

export interface GuestRelations {
  // Describe navigational properties here
}

export type GuestWithRelations = Guest & GuestRelations;

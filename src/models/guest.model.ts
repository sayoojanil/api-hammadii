import {Entity, model, property} from '@loopback/repository';

@model()
export class Guest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

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
  aadhar: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

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
    default: 'monthly',
  })
  paymentCycle: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  amountPaid: number;

  @property({
    type: 'string',
    required: true,
    default: 'with-food',
  })
  foodPreference: string;

  @property({
    type: 'string',
    required: true,
  })
  stayStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  joinDate: string;

  constructor(data?: Partial<Guest>) {
    super(data);
  }
}

export interface GuestRelations {
  // Define navigational properties here
}

export type GuestWithRelations = Guest & GuestRelations;

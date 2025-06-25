import { Entity, model, property } from '@loopback/repository';

@model()
export class RentRecord extends Entity {
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
  buildingName: string;

  @property({
    type: 'string',
    required: true,
  })
  unitNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  tenantName: string;

  @property({
    type: 'string',
    required: true,
  })
  contactEmail: string;

  @property({
    type: 'number',
    required: true,
  })
  monthlyRent: number;

  @property({
    type: 'string',
    required: true,
  })
  leaseStart: string;

  @property({
    type: 'string',
    required: true,
  })
  leaseEnd: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['paid', 'pending', 'overdue', 'partial'],
    },
  })
  paymentStatus: string;

  @property({
    type: 'string',
  })
  notes?: string;

  constructor(data?: Partial<RentRecord>) {
    super(data);
  }
}

export interface RentRecordRelations {
  // Define navigational properties if any
}

export type RentRecordWithRelations = RentRecord & RentRecordRelations;

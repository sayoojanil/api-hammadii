import { Entity, model, property } from '@loopback/repository';

@model()
export class Payment extends Entity {
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
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['paid', 'overdue','Awaiting_payment'],
    },
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  duedate: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentMethod: string;

  @property({
    type: 'string',
    required: true,
  })
  notes: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: false,
    default: [],
  })
  notesHistory: { date: string; note: string }[];

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // Define navigational properties if any
}

export type PaymentWithRelations = Payment & PaymentRelations;

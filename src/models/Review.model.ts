import { Entity, model, property } from '@loopback/repository';

@model()
export class Review extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // Define navigational properties if any
}

export type ReviewWithRelations = Review & ReviewRelations;

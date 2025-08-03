import { Entity, model, property } from '@loopback/repository';

@model()
export class GuestOut extends Entity {
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
  content: string;

  @property({
    type: 'string',
    required: false,
  })
  outTime?: string;

  @property({
    type: 'string',
    required: false,
  })
  inTime?: string;

  constructor(data?: Partial<GuestOut>) {
    super(data);
  }
}

export interface GuestOutRelations {
  // describe navigational properties here
}

export type GuestOutWithRelations = GuestOut & GuestOutRelations;

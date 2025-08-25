// src/models/post.model.ts
import {Entity, model, property} from '@loopback/repository';

@model()
export class Post extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;


  @property({
    type: 'string',
    required: false,
  })
  image?: string;

   @property({
    type: 'string',
    required: false,
  })
  tags?: string;

  @property({
    type: 'date',
    required: false,
  })
  createdAt?: Date;

  // Add more properties as needed, e.g., image, tags, userId

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;

import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'comments' // MongoDB collection name
})
export class Comment extends Entity {
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
  postId: string; // Blog post ID

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here if needed
}

export type CommentWithRelations = Comment & CommentRelations;

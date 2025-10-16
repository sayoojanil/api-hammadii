import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {strict: true},
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
  postId: string; // The blog post this comment belongs to

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
  createdAt?: string;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // Define navigational properties here (if any)
}

export type CommentWithRelations = Comment & CommentRelations;

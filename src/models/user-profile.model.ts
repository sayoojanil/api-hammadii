import { Entity, model, property } from '@loopback/repository';

@model()
export class UserProfile extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
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
  email: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'string',
  })
  bio?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
    required: true,
  })
  joinedDate: string;

  @property({
    type: 'number',
    default: 0,
  })
  postsCount: number;

  @property({
    type: 'number',
    default: 0,
  })
  followersCount: number;

  @property({
    type: 'number',
    default: 0,
  })
  followingCount: number;

  @property({
    type: 'object',
  })
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };

  constructor(data?: Partial<UserProfile>) {
    super(data);
  }
}

export interface UserProfileRelations {
  // Define navigational properties if any
}

export type UserProfileWithRelations = UserProfile & UserProfileRelations;

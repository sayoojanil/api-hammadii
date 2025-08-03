import { Entity, model, property } from '@loopback/repository';

@model()
export class Course extends Entity {
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
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;



  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'string',
    required: true,
  })
  difficulty: string;

  @property({
    type: 'string',
    required: true,
  })
  provided_by: string;

   @property({
    type: 'string',
    required: true,
  })
  amount: string;

   @property({
    type: 'string',
    required: true,
  })
  course_structure: string;

  @property({
    type: 'string',
    required: true,
  })
  video_link: string;

  @property({
    type: 'string',
  })
  image?: string;

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;

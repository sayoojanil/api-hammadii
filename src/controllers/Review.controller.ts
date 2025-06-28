import { repository } from '@loopback/repository';
import { post, get, requestBody, response, HttpErrors, param, del } from '@loopback/rest';
import { ReviewRepository } from '../repositories';
import { Review } from '../models';

export class ReviewController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) {}

  @post('/reviews')
  @response(200, {
    description: 'Review model instance',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'rating', 'comment'],
            properties: {
              name: { type: 'string' },
              rating: { type: 'number', minimum: 1, maximum: 5 },
              comment: { type: 'string' },
            },
          },
        },
      },
    })
    review: Omit<Review, 'id' | 'createdAt'>,
  ): Promise<Review> {
    if (review.rating < 1 || review.rating > 5) {
      throw new HttpErrors.BadRequest('Rating must be between 1 and 5');
    }
    return this.reviewRepository.create(review);
  }

  @get('/reviews')
  @response(200, {
    description: 'Array of Review model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { type: 'object' },
        },
      },
    },
  })
  async find(): Promise<Review[]> {
    return this.reviewRepository.find({
      order: ['createdAt DESC'],
    });
  }

  @del('Delete/reviews/{id}')
  @response(204, {
    description: 'Review DELETE success',
  })
  async deleteById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
            },
          },
        },
      },
    })
    request: { name: string },
  ): Promise<void> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new HttpErrors.NotFound(`Review with ID ${id} not found`);
    }
    if (review.name !== request.name) {
      throw new HttpErrors.Forbidden('You can only delete your own reviews');
    }
    await this.reviewRepository.deleteById(id);
  }
}

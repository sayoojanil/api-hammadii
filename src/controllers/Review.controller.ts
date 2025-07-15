import { repository } from '@loopback/repository';
import { post, get, put, del, param, requestBody, HttpErrors } from '@loopback/rest';
import { ReviewRepository } from '../repositories';
import { Review } from '../models';

export class ReviewController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) {}

  @post('/reviews', {
    responses: {
      '200': {
        description: 'Review model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Review } } },
      },
    },
  })
  async create(@requestBody() review: Omit<Review, 'id'>): Promise<Review> {
    if (!review.name || !review.rating || !review.comment) {
      throw new HttpErrors.BadRequest('Missing required fields');
    }
    if (review.rating < 1 || review.rating > 5) {
      throw new HttpErrors.BadRequest('Rating must be between 1 and 5');
    }
    return this.reviewRepository.create(review);
  }

  @get('/reviews', {
    responses: {
      '200': {
        description: 'Array of Review model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Review } },
          },
        },
      },
    },
  })
  async find(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  @get('/reviews/{id}', {
    responses: {
      '200': {
        description: 'Review model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Review } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Review> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new HttpErrors.NotFound(`Review with ID ${id} not found`);
    }
    return review;
  }

  @put('/reviews/{id}', {
    responses: {
      '204': {
        description: 'Review PUT success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() review: Review,
  ): Promise<void> {
    const existingReview = await this.reviewRepository.findById(id);
    if (!existingReview) {
      throw new HttpErrors.NotFound(`Review with ID ${id} not found`);
    }
    if (!review.name || !review.rating || !review.comment) {
      throw new HttpErrors.BadRequest('Missing required fields');
    }
    if (review.rating < 1 || review.rating > 5) {
      throw new HttpErrors.BadRequest('Rating must be between 1 and 5');
    }
    await this.reviewRepository.updateById(id, review);
  }

  @del('/reviews/{id}', {
    responses: {
      '204': {
        description: 'Review DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    const existingReview = await this.reviewRepository.findById(id);
    if (!existingReview) {
      throw new HttpErrors.NotFound(`Review with ID ${id} not found`);
    }
    await this.reviewRepository.deleteById(id);
  }
}

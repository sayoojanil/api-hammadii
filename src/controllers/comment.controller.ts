import {repository} from '@loopback/repository';
import {get, post, param, requestBody, getModelSchemaRef} from '@loopback/rest';
import {Comment} from '../models';
import {CommentRepository} from '../repositories';

export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) {}

  /**
   * ✅ Get all comments for a given post ID
   * Endpoint: GET /get/comments/{postId}
   */
  @get('/get/comments/{postId}', {
    responses: {
      '200': {
        description: 'Array of Comments for the given postId',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Comment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findByPostId(
    @param.path.string('postId') postId: string,
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {postId},
      order: ['createdAt DESC'],
    });
  }

  /**
   * ✅ Create a new comment
   * Endpoint: POST /add/comment
   */
  @post('/add/comment', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async createComment(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {exclude: ['id']}),
        },
      },
    })
    commentData: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.commentRepository.create(commentData);
  }
}

import {repository} from '@loopback/repository';
import {
  get,
  post,
  param,
  requestBody,
  response,
} from '@loopback/rest';
import {Comment} from '../models';
import {CommentRepository} from '../repositories';

export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) {}

  // ✅ Add a new comment
  @post('/add/comment')
  @response(200, {
    description: 'Add a new comment',
    content: {'application/json': {schema: {'x-ts-type': Comment}}},
  })
  async addComment(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['postId', 'username', 'text'],
            properties: {
              postId: {type: 'string'},
              username: {type: 'string'},
              text: {type: 'string'},
            },
          },
        },
      },
    })
    data: {postId: string; username: string; text: string},
  ): Promise<Comment> {
    const newComment = await this.commentRepository.create({
      postId: data.postId,
      username: data.username,
      text: data.text,
      createdAt: new Date(),
    });
    return newComment;
  }

  // ✅ Get all comments for a post
  @get('/get/comments/{postId}')
  @response(200, {
    description: 'Array of Comments for a specific post',
    content: {
      'application/json': {
        schema: {type: 'array', items: {'x-ts-type': Comment}},
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

  // (Optional) ✅ Get all comments (admin/debug)
  @get('/get/comments')
  @response(200, {
    description: 'Get all comments',
    content: {'application/json': {schema: {type: 'array', items: {'x-ts-type': Comment}}}},
  })
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({order: ['createdAt DESC']});
  }
}

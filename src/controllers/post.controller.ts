import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Post} from '../models';
import {PostRepository} from '../repositories';

export class PostController {
  constructor(
    @repository(PostRepository)
    public postRepository: PostRepository,
  ) {}

  // ✅ Create a new Post
  @post('add/posts')
  @response(200, {
    description: 'Post model instance',
    content: {'application/json': {schema: getModelSchemaRef(Post)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {
            exclude: ['id'],
          }),
        },
      },
    })
    post: Omit<Post, 'id'>,
  ): Promise<Post> {
    return this.postRepository.create(post);
  }

  // ✅ Get all Posts
  @get('get/posts')
  @response(200, {
    description: 'Array of Post model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Post, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Post) filter?: Filter<Post>): Promise<Post[]> {
    return this.postRepository.find(filter);
  }

  // ✅ Get Post by ID
  @get('get/posts/{id}')
  @response(200, {
    description: 'Post model instance by ID',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Post, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Post> {
    return this.postRepository.findById(id);
  }

  // ✅ Update Post by ID (PATCH)
  @patch('update/posts/{id}')
  @response(200, {
    description: 'Post PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),
        },
      },
    })
    post: Partial<Post>,
  ): Promise<void> {
    await this.postRepository.updateById(id, post);
  }

  // ✅ Replace Post by ID (PUT)
  @put('replace/posts/{id}')
  @response(200, {
    description: 'Post model replaced successfully',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() post: Post,
  ): Promise<void> {
    await this.postRepository.replaceById(id, post);
  }

  // ✅ Delete Post by ID
  @del('delete/posts/{id}')
  @response(200, {
    description: 'Post DELETE success count',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postRepository.deleteById(id);
  }
}

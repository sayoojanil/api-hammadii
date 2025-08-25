// src/repositories/post.repository.ts
import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources'; // Assume you have a datasource named 'db' or adjust accordingly
import {Post, PostRelations} from '../models';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Post, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Comment, CommentRelations} from '../models';
import {MongodbDataSource} from '../datasources'; // adjust name to match your datasource

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
  // ;as;
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Comment, dataSource);
  }
}

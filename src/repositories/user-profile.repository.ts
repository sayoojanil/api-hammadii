import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { UserProfile, UserProfileRelations } from '../models/user-profile.model';
import {DbDataSource} from '../datasources';

export class UserProfileRepository extends DefaultCrudRepository<
  UserProfile,
  typeof UserProfile.prototype.id,
  UserProfileRelations
> {
  constructor(
    @inject('datasources.memory') dataSource: DbDataSource,
  ) {
    super(UserProfile, dataSource);
  }
}

import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Guest, GuestRelations } from '../models';

export class GuestRepository extends DefaultCrudRepository<
  Guest,
  typeof Guest.prototype.id,
  GuestRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Guest, dataSource);
  }
}

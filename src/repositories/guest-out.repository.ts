import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from '@loopback/repository';
import { GuestOut, GuestOutRelations } from '../models';
import {DbDataSource} from '../datasources';

export class GuestOutRepository extends DefaultCrudRepository<
  GuestOut,
  typeof GuestOut.prototype.id,
  GuestOutRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(GuestOut, dataSource);
  }
}

import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { RentRecord, RentRecordRelations } from '../models';

export class RentRecordRepository extends DefaultCrudRepository<
  RentRecord,
  typeof RentRecord.prototype.id,
  RentRecordRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(RentRecord, dataSource);
  }
}

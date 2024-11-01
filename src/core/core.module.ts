import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

import { EnvModule } from '@core/env.module'
import { RelationalDatabaseModule } from '@core/relational-db.module'
// import { MongoDbModule } from './mongo-db.module'

@Module({
  imports: [
    EnvModule,
    RelationalDatabaseModule,
    // MongoDbModule,
    MulterModule.register(),
  ],
})
export class CoreModule {}

import { Module } from "@nestjs/common"
import { MulterModule } from "@nestjs/platform-express"

import { EnvModule } from "./env.module"
import { PostgreSqlModule } from "./postgre-sql.module"
import { MongoDbModule } from "./mongo-db.module"

@Module({
  imports: [
    EnvModule,
    PostgreSqlModule,
    MongoDbModule,
    MulterModule.register(),
  ],
})
export class CoreModule {}

import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@entities/entities'
import { UserEntityProvider } from '@entities/services'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserEntityProvider],
  exports: [UserEntityProvider],
})
export class EntitiesModule {}

import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { EntitiesModule } from '@entities/entities.module'
import { AuthModule } from '@auth/auth.module'

@Module({
  imports: [CoreModule, EntitiesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

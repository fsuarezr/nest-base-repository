import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { EntitiesModule } from '@entities/entities.module'

@Module({
  imports: [CoreModule, EntitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

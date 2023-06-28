import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MulterModule } from "@nestjs/platform-express"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(`mongoDatabase.url`),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register(),
  ],
})
export class MongoDbModule {}

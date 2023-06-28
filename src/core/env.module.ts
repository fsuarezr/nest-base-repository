import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MulterModule } from "@nestjs/platform-express"
import loadConfig from "./config/load-config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `.env`,
      load: loadConfig,
    }),
    MulterModule.register(),
  ],
})
export class EnvModule {}

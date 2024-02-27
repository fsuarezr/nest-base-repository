import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import loadConfig from './config/load-config'
import { enviroments } from './config/enviroments'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: enviroments[ENV] || `.env`,
      load: loadConfig,
    }),
    MulterModule.register(),
  ],
})
export class EnvModule {}

import { join } from 'path'
import { readFileSync } from 'fs'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: `postgres`,
        ssl: configService.get(`db.staging`) === `prod`,
        extra: {
          ssl:
            configService.get(`db.staging`) === `prod`
              ? {
                  rejectUnauthorized: false,
                  ca: readFileSync(
                    join(
                      process.cwd(),
                      configService.get(`db.certificatePath`),
                    ),
                  ).toString(),
                }
              : null,
        },
        host: configService.get<string>(`pgdb.host`),
        port: +configService.get<number>(`pgdb.port`),
        database: configService.get<string>(`pgdb.database`),
        username: configService.get<string>(`pgdb.username`),
        password: configService.get<string>(`pgdb.password`),
        autoLoadEntities: true,
        synchronize: true, // se recomienda tener este valor en true sólo para modo desarrollo
      }),
      inject: [ConfigService],
    }),
    MulterModule.register(),
  ],
})
export class RelationalDatabaseModule {}

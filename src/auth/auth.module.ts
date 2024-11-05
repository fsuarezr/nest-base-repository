import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from '@auth/services/auth.service'
import { AuthController } from '@auth/controllers/auth.controller'
import { JwtStrategy } from '@auth/strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        defaultStrategy: configService.get<string>(`auth.defaultStrategy`),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(`auth.jwtSecret`),
        signOptions: {
          expiresIn: configService.get<string>(`auth.jwtExpiresIn`),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}

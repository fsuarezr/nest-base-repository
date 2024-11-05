import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload } from '@auth/interfaces/jwt-payload.interface'
import { UserEntityProvider } from '@entities/services'
import { User } from '@entities/entities'
import { templateError } from '@utils/Response'
import { ErrorResponseObject } from '@utils/interfaces/response'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userProvider: UserEntityProvider,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get(`auth.jwtSecret`),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload): Promise<User | ErrorResponseObject> {
    const { id } = payload

    const userResponse = await this.userProvider.findOneById(id)
    if (!userResponse.success) {
      throw new UnauthorizedException(
        templateError({
          code: 401,
          message: `Token not valid`,
        }),
      )
    }

    const user = userResponse.data as User

    if (!user.is_active)
      throw new UnauthorizedException(
        templateError({
          code: 401,
          message: `User is inactive, talk with and admin`,
        }),
      )

    return user
  }
}

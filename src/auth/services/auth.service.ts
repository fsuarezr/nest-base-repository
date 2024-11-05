import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { JwtPayload } from '@auth/interfaces/jwt-payload.interface'

import { LoginUserDto } from '@auth/dto/login-user.dto'

import { User } from '@entities/entities'
import { CreateUserDTO } from '@entities/dto'
import { UserEntityProvider } from '@entities/services'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(`AuthService`)
  constructor(
    private readonly userProvider: UserEntityProvider,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    try {
      const userProviderResponse = await this.userProvider.createUser(
        createUserDto,
      )

      if (!userProviderResponse.success) {
        return {
          success: false,
          data: { code: 401, message: `Token not valid` },
        }
      }

      const user = userProviderResponse.data as User

      delete user.password

      return {
        success: true,
        data: { user, token: this.getjwtToken({ id: user.id }) },
      }
    } catch (error) {
      return { success: false, data: { code: 500, message: error.message } }
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto

    const userProviderResponse = await this.userProvider.findOneByEmail(email, {
      email: true,
      password: true,
      id: true,
    })

    if (!userProviderResponse.success)
      return {
        success: false,
        data: { code: 401, message: `Credentials are not valid` },
      }

    const user = userProviderResponse.data as User

    if (!bcrypt.compareSync(password, user.password))
      return {
        success: false,
        data: { code: 401, message: `Credentials are not valid` },
      }

    return {
      success: true,
      data: {
        user,
        token: this.getjwtToken({ id: user.id }),
      },
    }
  }

  async checkAuthStatus(user: User) {
    return {
      user,
      token: this.getjwtToken({ id: user.id }),
    }
  }

  private getjwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)

    return token
  }
}

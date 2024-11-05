import { Body, Controller, Get, Post } from '@nestjs/common'

import { AuthService } from '@auth/services/auth.service'
import { LoginUserDto } from '@auth/dto/login-user.dto'
import { CreateUserResponse, LoginUserResponse } from '@auth/interfaces'
import { Auth, GetUser } from '@auth/decorators'

import { CreateUserDTO } from '@entities/dto'
import { User } from '@entities/entities'
import { ErrorResponseObject, ResponseObject } from '@utils/interfaces/response'
import { templateError, templateSuccess } from '@utils/Response'

@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`register`)
  async createUser(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<ResponseObject<CreateUserResponse>> {
    const { success, data } = await this.authService.createUser(createUserDto)

    if (!success) return templateError(data as ErrorResponseObject)

    return templateSuccess(data as CreateUserResponse)
  }

  @Post(`login`)
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ResponseObject<LoginUserResponse>> {
    const { success, data } = await this.authService.loginUser(loginUserDto)

    if (!success) return templateError(data as ErrorResponseObject)

    return templateSuccess(data as LoginUserResponse)
  }

  @Get(`check-status`)
  @Auth()
  async checkAuthStatus(@GetUser() user: User) {
    console.log(user)

    const token = await this.authService.checkAuthStatus(user)
    console.log(token)

    return templateSuccess(token)
  }
}

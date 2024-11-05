import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

import { templateError } from '@utils/Response'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      `roles`,
      context.getHandler(),
    )

    if (!validRoles || validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user

    if (!user)
      throw new BadRequestException(
        templateError({ code: 400, message: `Invalid User` }),
      )

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true
    }

    throw new ForbiddenException(
      templateError({
        code: 403,
        message: `User: ${user.fullName} needs a valid role`,
      }),
    )
  }
}

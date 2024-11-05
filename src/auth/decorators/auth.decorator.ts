import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ValidRoles } from '../interfaces'
import { RoleProtected } from './role-protected.decorator'
import { UserRoleGuard } from '../guards/user-role/user-role.guard'

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  )
}

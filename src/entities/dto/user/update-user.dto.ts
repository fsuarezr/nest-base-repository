import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsDate, IsOptional } from 'class-validator'
import { CreateUserDTO } from '@entities/dto/user/create-user.dto'

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsDate()
  @IsOptional()
  updated_at?: Date

  @IsBoolean()
  @IsOptional()
  is_active?: boolean
}

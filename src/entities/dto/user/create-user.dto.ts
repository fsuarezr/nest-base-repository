import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator'

export class CreateUserDTO {
  @IsString()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `The password must have a Uppercase, lowercase letter and a number`,
  })
  password: string

  @IsString()
  fullName: string

  @IsOptional()
  roles: string[]
}

import { User } from '@entities/entities'

export interface CreateUserResponse {
  user: User
  token: string
}

export interface LoginUserResponse {
  user: User
  token: string
}

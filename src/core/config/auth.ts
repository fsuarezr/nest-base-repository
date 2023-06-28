import { registerAs } from "@nestjs/config"

export default registerAs(`auth`, () => {
  const defaultStrategy = process.env.AUTH_DEFAULTSTRATEGY || `jwt`
  const jwtSecret = process.env.AUTH_JWT_SECRET
  const jwtExpiresIn = process.env.AUTH_JWT_EXPIRES_IN

  return {
    defaultStrategy,
    jwtSecret,
    jwtExpiresIn,
  }
})

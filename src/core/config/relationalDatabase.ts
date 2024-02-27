import { registerAs } from '@nestjs/config'

export default registerAs(`db`, () => {
  const staging = process.env.DB_STAGING

  const host = process.env.DB_HOST

  const port = process.env.DB_PORT

  const database = process.env.DB_NAME

  const username = process.env.DB_USER

  const password = process.env.DB_PASSWORD

  const certificatePath = process.env.DB_CERTIFICATE_PATH

  return {
    host,
    port,
    username,
    password,
    database,
    staging,
    certificatePath,
  }
})

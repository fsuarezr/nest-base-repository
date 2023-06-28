import { registerAs } from "@nestjs/config"

export default registerAs(`pgdb`, () => {
  const staging = process.env.DB_STAGING

  const host = process.env.DB_HOST

  const port = process.env.DB_PORT

  const database = process.env.DB_NAME

  const username = process.env.DB_USER

  const password = process.env.DB_PASSWORD

  return {
    host,
    port,
    username,
    password,
    database,
    staging,
  }
})

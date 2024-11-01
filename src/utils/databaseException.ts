import { Logger } from '@nestjs/common'

const logger = new Logger(`database-exception`)

export function handleDBExceptions(error: any, source: string) {
  logger.error(``)
  logger.error(`Something happend during: ${source} execution`)
  logger.error(JSON.stringify(error))

  const code: number = error.code
  const message: string = error.detail ? error.detail : error.message

  return { data: { code, message } }
}

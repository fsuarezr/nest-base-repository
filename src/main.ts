import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common'

import { AppModule } from '@/app.module'
import { templateError } from '@utils/Response'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger(`main`)

  // Obteniendo variables de entorno
  const configService = app.get(ConfigService)
  const port = configService.get(`api.port`)
  const prefix = configService.get(`api.prefix`)

  app.setGlobalPrefix(prefix)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const errorsMessages = errors.map(
          (error) => error.constraints[Object.keys(error.constraints)[0]],
        )
        return new BadRequestException(
          templateError({ code: 400, message: errorsMessages }),
        )
      },
    }),
  )

  await app.listen(port)
  logger.log(`App running on port: ${port}`)
}

bootstrap()

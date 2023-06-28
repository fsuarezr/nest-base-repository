import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { Logger, ValidationPipe } from "@nestjs/common"

import { AppModule } from "./app.module"

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
    }),
  )

  await app.listen(port)
  logger.log(`App running on port: ${port}`)
}

bootstrap()

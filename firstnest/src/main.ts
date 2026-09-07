import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import Helmet from 'helmet'

const PORT = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(Helmet())
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
await bootstrap();
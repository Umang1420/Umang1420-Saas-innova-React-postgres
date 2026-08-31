import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { DogsController } from './dogs/dogs.controller.js';


@Module({
  imports: [],
  controllers: [AppController, DogsController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { \[dogs\]Controller } from './[dogs/]/[dogs/].controller.js';
import { DogsController } from './dogs/dogs.controller.js';
import { DogsController } from './dogs/dogs.controller.js';
import { \[dogs\]Controller } from './[dogs/]/[dogs/].controller.js';

@Module({
  imports: [],
  controllers: [AppController, \[dogs\]Controller, \[dogs\]Controller, DogsController],
  providers: [AppService],
})
export class AppModule {}

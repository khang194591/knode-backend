import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [AppConfigModule, DatabaseModule, CqrsModule.forRoot()],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [AppConfigModule, DatabaseModule],
})
export class CoreModule {}

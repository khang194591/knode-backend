import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [AppConfigModule, DatabaseModule],
})
export class CoreModule {}

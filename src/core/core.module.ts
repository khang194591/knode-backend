import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    CqrsModule.forRoot(),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: __dirname + '/../i18n/',
          watch: true,
        },
      }),
      resolvers: [new HeaderResolver(['x-language'])],
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [AppConfigModule, DatabaseModule],
})
export class CoreModule {}

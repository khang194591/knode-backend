import { createKeyv } from '@keyv/redis';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    CqrsModule.forRoot(),
    I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: __dirname + '/../i18n/',
          watch: true,
        },
      }),
      resolvers: [new HeaderResolver(['x-language'])],
    }),
    // CacheModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const host = configService.getOrThrow<string>('REDIS_HOST');
    //     const port = configService.getOrThrow<string>('REDIS_PORT');
    //     return { stores: [createKeyv(`redis://${host}:${port}`)] };
    //   },
    // }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.getOrThrow<string>('REDIS_HOST');
        const port = +configService.getOrThrow<string>('REDIS_PORT');

        return {
          prefix: 'queue',
          connection: { host, port },
        };
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
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

import { BridgeModule, HealthModule, UniswapModule } from '@api/modules'
import {
  basicInterceptors,
  config,
  getWinstonParams,
  HttpModule,
  loadConfiguration,
  Logger,
  LogRequest,
} from '@common'
import { Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston'

@Module({
  imports: [
    ConfigModule.forRoot(config),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getWinstonParams,
    }),
    HttpModule,
    HealthModule,
    UniswapModule,
    BridgeModule,
  ],
  providers: basicInterceptors,
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogRequest).forRoutes('*')
  }

  onModuleInit(): void {
    const { nodeEnv, app } = loadConfiguration()
    this.logger.log(
      {
        nodeEnv,
        ...app,
      },
      'App',
    )
  }
}

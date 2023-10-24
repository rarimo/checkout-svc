import { Web3ProviderService } from '@common'
import { Module } from '@nestjs/common'

import { BridgeController } from './bridge.controller'
import { BridgeService } from './bridge.service'

@Module({
  providers: [Web3ProviderService, BridgeService],
  controllers: [BridgeController],
})
export class BridgeModule {}

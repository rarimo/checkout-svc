import { DexService, Web3ProviderService } from '@common'
import { Module } from '@nestjs/common'

import { UniswapController } from './uniswap.controller'
import { UniswapService } from './uniswap.service'

@Module({
  providers: [Web3ProviderService, DexService, UniswapService],
  controllers: [UniswapController],
})
export class UniswapModule {}

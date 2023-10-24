import { BridgeEndpoints } from '@common'
import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

import { BridgeService } from './bridge.service'
import {
  BridgeGetDeterminedBundlerAddressQueryDto,
  BridgeGetDeterminedBundlerAddressResponseDto,
} from './dto'

@ApiTags('Bridge')
@Controller(BridgeEndpoints.v1Bridge)
export class BridgeController {
  constructor(private service: BridgeService) {}

  @ApiOperation({ summary: 'Get determined bundler address' })
  @ApiQuery({ type: BridgeGetDeterminedBundlerAddressQueryDto })
  @ApiResponse({ type: BridgeGetDeterminedBundlerAddressResponseDto })
  @Get(BridgeEndpoints.BundlerAddress)
  getBundlerAddress(
    @Query()
    query: BridgeGetDeterminedBundlerAddressQueryDto,
  ) {
    return this.service.getBundlerAddress(query.salt, query.chainName)
  }
}

import { UniswapEndpoints } from '@common'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Amount } from '@rarimo/shared'

import { UniswapEstimateQueryDto, UniswapEstimateResponseDto } from './dto'
import { UniswapService } from './uniswap.service'

@ApiTags('Uniswap')
@Controller(UniswapEndpoints.v1Uniswap)
export class UniswapController {
  constructor(private service: UniswapService) {}

  @ApiOperation({ summary: 'Estimate price of the swap' })
  @ApiQuery({ type: UniswapEstimateQueryDto })
  @ApiResponse({ type: UniswapEstimateResponseDto })
  @Get(UniswapEndpoints.estimate)
  estimate(
    @Query()
    query: UniswapEstimateQueryDto,
  ) {
    if (!query.amountOut && !query.amountIn) {
      throw new BadRequestException('Either amountIn or amountOut must be provided')
    }
    if (query.amountOut && query.amountIn) {
      throw new BadRequestException('Only one of amountIn or amountOut must be provided')
    }

    return this.service.estimate({
      from: query.from,
      to: query.to,
      params: {
        chainIdFrom: query.chainIdFrom,
        chainIdTo: query.chainIdTo,
        slippage: query.slippage,
        ...(query.amountIn && {
          amountIn: Amount.fromBigInt(query.amountIn.value, query.amountIn.decimals),
        }),
        ...(query.amountOut && {
          amountOut: Amount.fromBigInt(query.amountOut.value, query.amountOut.decimals),
        }),
      },
    })
  }
}

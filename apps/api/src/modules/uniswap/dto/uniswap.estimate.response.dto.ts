import { AmountDto } from '@common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UniswapEstimateResponseDto {
  @ApiProperty({
    type: [String],
    example: ['0x42d7025938bec20b69cbae5a77421082407f053a'],
    required: true,
  })
  path: string[]

  @ApiProperty({ type: () => AmountDto })
  amountIn: AmountDto

  @ApiProperty({ type: () => AmountDto })
  amountOut: AmountDto

  @ApiPropertyOptional({ type: String, example: '0.123' })
  impact?: string

  @ApiPropertyOptional({ type: String, example: '0.1231534123' })
  gasPrice?: string

  @ApiPropertyOptional({ type: String, example: '0.1231534123' })
  gasPriceInUSD?: string
}

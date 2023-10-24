import { AmountDto, TokenDto } from '@common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNotEmptyObject, IsNumber, IsOptional, Max, Min, ValidateNested } from 'class-validator'

export class UniswapEstimateQueryDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  chainIdFrom: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  chainIdTo: number

  @ValidateNested()
  @IsNotEmptyObject()
  @ApiProperty({ type: TokenDto })
  @Type(() => TokenDto)
  from: TokenDto

  @ValidateNested()
  @IsNotEmptyObject()
  @ApiProperty({ type: TokenDto })
  @Type(() => TokenDto)
  to: TokenDto

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiPropertyOptional({
    type: Number,
    example: 0.5,
  })
  slippage?: number

  @ValidateNested()
  @IsOptional()
  @IsNotEmptyObject()
  @ApiPropertyOptional({ type: AmountDto })
  @Type(() => AmountDto)
  amountIn: AmountDto

  @ValidateNested()
  @IsOptional()
  @IsNotEmptyObject()
  @ApiPropertyOptional({ type: AmountDto })
  @Type(() => AmountDto)
  amountOut: AmountDto
}

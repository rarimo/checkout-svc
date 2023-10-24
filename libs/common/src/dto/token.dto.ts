import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEthereumAddress, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Ethereum',
    required: true,
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'ETH',
    required: true,
  })
  symbol: string

  @IsOptional()
  @IsEthereumAddress()
  @ApiPropertyOptional({
    type: String,
    example: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  })
  address: string

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 18,
    required: true,
  })
  decimals: number
}

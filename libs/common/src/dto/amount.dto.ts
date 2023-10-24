import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class AmountDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '10000000000000000',
    required: true,
  })
  value: string

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 18,
    required: true,
  })
  decimals: number
}

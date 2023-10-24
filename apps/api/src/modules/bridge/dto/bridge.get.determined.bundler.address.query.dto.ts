import { ApiProperty } from '@nestjs/swagger'
import { ChainNames } from '@rarimo/shared'
import { IsString } from 'class-validator'

export class BridgeGetDeterminedBundlerAddressQueryDto {
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
  })
  salt: string

  @IsString()
  @ApiProperty({
    type: String,
    example: ChainNames.Goerli,
    required: true,
  })
  chainName: ChainNames
}

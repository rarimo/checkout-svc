import { ApiProperty } from '@nestjs/swagger'

export class BridgeGetDeterminedBundlerAddressResponseDto {
  @ApiProperty({
    type: String,
    example: '0x...',
    required: true,
  })
  address: string
}

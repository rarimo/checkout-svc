import { Web3Provider } from '@common/types'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChainId } from '@rarimo/shared'
import { providers } from 'ethers'

@Injectable()
export class Web3ProviderService {
  private readonly providers = new Map<ChainId, Web3Provider>()

  constructor(private readonly configService: ConfigService) {
    const rpcMap = this.configService.get('rpc')

    rpcMap.forEach(cfg => {
      const provider = new providers.JsonRpcProvider(cfg.url, 'any')
      this.providers.set(cfg.chainId, provider)
    })
  }

  getProvider(chainId: ChainId): providers.JsonRpcProvider {
    return this.providers.get(chainId)
  }
}

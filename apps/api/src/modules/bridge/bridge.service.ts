import { BRIDGE_ABI, type ChainDetails, Web3ProviderService } from '@common'
import { type Time, time } from '@distributedlab/tools'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CHAIN_IDS, type ChainNames, ChainTypes, coreApi } from '@rarimo/shared'
import { Contract } from 'ethers'

type ChainsDetailsStorage = {
  loadTime: Time
  chainsDetails: ChainDetails[]
}

@Injectable()
export class BridgeService {
  private readonly chainsDetails = new Map<ChainNames, ChainsDetailsStorage>()
  private readonly ttl: number

  constructor(
    private readonly configService: ConfigService,
    private readonly web3ProviderService: Web3ProviderService,
  ) {
    this.ttl = this.configService.get<number>('bridge.ttl')
  }

  async getBundlerAddress(salt: string, chainName: ChainNames) {
    const chainsDetailsStorage = this.chainsDetails.get(chainName)
    let chainsDetails = chainsDetailsStorage?.chainsDetails

    if (!chainsDetailsStorage || !this.isFresh(chainsDetailsStorage.loadTime, this.ttl)) {
      const { data } = await coreApi.get<ChainDetails[]>('/v1/chains')

      chainsDetails = data

      this.chainsDetails.set(chainName, {
        loadTime: time(),
        chainsDetails,
      })
    }

    const bridgeContract = chainsDetails.find(el => el.name === chainName).bridge_contract

    const chainId = CHAIN_IDS[ChainTypes.EVM][chainName]

    const provider = this.web3ProviderService.getProvider(chainId)

    const contract = new Contract(bridgeContract, BRIDGE_ABI, provider)

    return contract.determineProxyAddress(salt)
  }

  private isFresh(loadTime: Time, ttl: number): boolean {
    return time().isBefore(loadTime.add(ttl, 'ms'))
  }
}

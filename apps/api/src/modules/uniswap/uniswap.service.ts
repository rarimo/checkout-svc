import { CheckoutOperationParams, EstimatedPrice } from '@api/types'
import { DexService, TokenDto, Web3ProviderService } from '@common'
import { Time, time } from '@distributedlab/tools'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { newToken, Token } from '@rarimo/bridge'
import { Amount, BridgeChain } from '@rarimo/shared'

import { estimate } from './estimator'

type CacheItem = {
  createdAt: Time
  data: EstimatedPrice
}

@Injectable()
export class UniswapService {
  private readonly ttl = this.configService.get<number>('uniswap.ttl')
  private readonly multicallAddress = this.configService.get<string>('uniswap.multicallAddress')
  private readonly cache = new Map<string, CacheItem>()

  constructor(
    private readonly configService: ConfigService,
    private readonly web3NameService: Web3ProviderService,
    private readonly dexService: DexService,
  ) {}

  async estimate(opts: { params: CheckoutOperationParams; from: TokenDto; to: TokenDto }) {
    const tokens = await this.dexService.loadTokens(opts.params.chainIdFrom)
    const provider = this.web3NameService.getProvider(opts.params.chainIdFrom)
    const chain = await this.dexService.getChain(opts.params.chainIdFrom)

    const from = tokenFromTokenDto(opts.from, chain)
    const to = tokenFromTokenDto(opts.to, chain)

    const key = this.key(
      from,
      to,
      opts.params.amountOut ?? opts.params.amountIn,
      Boolean(opts.params.amountOut),
    )
    const cached = this.cache.get(key)

    if (cached && time().isBefore(cached.createdAt.add(this.ttl, 'ms'))) {
      return cached.data
    }

    const data = await estimate({
      ...opts,
      tokens,
      provider,
      from,
      to: to,
      multicallAddress: this.multicallAddress,
    })

    this.cache.set(key, { data, createdAt: time() })

    return data
  }

  private key(from: Token, to: Token, amount: Amount, isExactOut: boolean) {
    return [
      from.chain.id,
      from.symbol,
      from.address,
      to.chain.id,
      to.symbol,
      to.address,
      amount.value,
      amount.decimals,
      isExactOut,
    ].join(':')
  }
}

const tokenFromTokenDto = (token: TokenDto, chain: BridgeChain): Token => {
  return newToken({
    ...token,
    chain,
    isNative: !token.address,
  })
}

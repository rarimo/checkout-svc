import { Logger } from '@common'
import { Time, time } from '@distributedlab/tools'
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Token, tokenFromInternalSupportedToken } from '@rarimo/bridge'
import {
  BridgeChain,
  ChainId,
  ChainTypes,
  getSupportedChains,
  getSupportedTokens,
} from '@rarimo/shared'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

type TokenStorage = {
  loadTime: Time
  tokens: Token[]
}

@Injectable()
export class DexService {
  private readonly tokens = new Map<ChainId, TokenStorage>()
  private readonly chains = new Map<ChainId, BridgeChain>()
  private readonly tokensTTL: number
  private readonly chainsTTL: number
  private chainsLoadTime: Time

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) protected readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.tokensTTL = this.configService.get<number>('dex.tokensTTL')
    this.chainsTTL = this.configService.get<number>('dex.chainsTTL')
  }

  public async loadTokens(chainId: ChainId): Promise<Token[]> {
    try {
      const storage = this.tokens.get(Number(chainId))

      if (storage && this.isFresh(storage.loadTime, this.tokensTTL)) {
        this.logger.debug(`Return tokens from cache for the chain ${chainId}`, 'DexService')
        return storage.tokens
      }

      const chain = await this.getChain(chainId)
      const internalTokens = await getSupportedTokens(chain)
      const tokens = internalTokens.map(i => tokenFromInternalSupportedToken(i, chain))

      this.tokens.set(chainId, {
        loadTime: time(),
        tokens,
      })

      this.logger.debug(`Return fresh tokens for the chain ${chainId}`)
      return tokens
    } catch (err) {
      this.logger.error(err, err.stack, 'DexService')
      throw new InternalServerErrorException(err.toString())
    }
  }

  public async getChain(chainId: ChainId): Promise<BridgeChain> {
    try {
      const chain = this.chains.get(Number(chainId))

      if (chain && this.isFresh(this.chainsLoadTime, this.chainsTTL)) return chain

      const chains = await getSupportedChains({ type: ChainTypes.EVM })

      chains.forEach(chain => this.chains.set(Number(chain.id), chain))

      this.chainsLoadTime = time()

      return this.chains.get(Number(chainId))
    } catch (err) {
      this.logger.error(err, err.stack, 'DexService')
      throw new InternalServerErrorException(err.toString())
    }
  }

  private isFresh(loadTime: Time, ttl: number): boolean {
    return time().isBefore(loadTime.add(ttl, 'ms'))
  }
}

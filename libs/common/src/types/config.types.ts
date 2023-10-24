import { LogLevel, NodeEnv } from '@common'
import { ChainNames } from '@rarimo/shared'

export type RPCConfig = {
  chainId: number
  name: ChainNames
  url: string
}

export type Config = {
  nodeEnv: NodeEnv
  uniswap: {
    multicallAddress: string
    ttl: number
  }
  rpc: RPCConfig[]
  app: {
    name: string
    host: string
    port: number
    globalPrefix: string
  }
  log: {
    errorFile: string
    combinedFile: string
    level: LogLevel
    inJson: boolean
  }
  dex: {
    tokensTTL: number
    chainsTTL: number
  }
}

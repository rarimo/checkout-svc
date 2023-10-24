import { Web3Provider } from '@common'
import { Token } from '@rarimo/bridge'
import { Amount, ChainId } from '@rarimo/shared'

export type EstimatedPrice = {
  amountIn: Amount
  amountOut: Amount
  path?: string[]
  impact?: string
  gasPrice?: string
  gasPriceInUSD?: string
}

export type CheckoutOperationParams = {
  chainIdTo: ChainId
  chainIdFrom: ChainId
  amountIn?: Amount
  amountOut?: Amount
  slippage?: number
}

export type EstimateParams = {
  provider: Web3Provider
  tokens: Token[]
  from: Token
  to: Token
  params: CheckoutOperationParams
  multicallAddress: string
}

import type { CheckoutOperationParams, EstimatedPrice } from '@api/types'
import { EstimateParams } from '@api/types'
import { BN } from '@distributedlab/tools'
import { InternalServerErrorException } from '@nestjs/common'
import { Token } from '@rarimo/bridge'
import { Amount, ChainId, toLowerCase } from '@rarimo/shared'
import { WRAPPED_CHAIN_TOKEN_SYMBOLS } from '@rarimo/swap'

const DEFAULT_SLIPPAGE = 0.05
const LESS_THAN_FIVE_SLIPPAGE = 5
const LESS_THAN_TWENTY_SLIPPAGE = 2.5
const SWAP_TOKEN_SLIPPAGE_PERCENT = 0.02

export const TRADE_PARAMS = {
  maxHops: 3,
  maxNumResults: 1,
}

export const handleNativeToken = (tokens: Token[], token: Token): Token => {
  const _token = token.isNative ? getWrappedToken(tokens, token.chain.id) : token
  if (!_token) throw new InternalServerErrorException("Can't find native token")
  return _token
}

export const handleNativeTokens = (
  tokens: Token[],
  _from: Token,
  _to: Token,
): { from: Token; to: Token } => {
  const from = handleNativeToken(tokens, _from)
  const to = handleNativeToken(tokens, _to)
  return { from, to }
}

const getWrappedToken = (tokens: Token[], fromChainId: ChainId): Token | undefined => {
  const symbol = WRAPPED_CHAIN_TOKEN_SYMBOLS[Number(fromChainId)] ?? ''
  return tokens.find(t => toLowerCase(t.symbol) === toLowerCase(symbol))
}

export const isWrapOnly = (fromRaw: Token, fromHandled: Token, to: Token): boolean => {
  return fromRaw.isNative && toLowerCase(fromHandled.address) === toLowerCase(to.address)
}

export const isUnwrapOnly = (toRaw: Token, toHandled: Token, from: Token): boolean => {
  return toRaw.isNative && toLowerCase(toHandled.address) === toLowerCase(from.address)
}

export const createWrapUnwrapEstimate = (
  from: Token,
  to: Token,
  params: CheckoutOperationParams,
): EstimatedPrice => ({
  impact: '0',
  amountIn: params.amountOut,
  amountOut: params.amountOut,
})

export const getAmountInWithSwapSlippage = (value: string, decimals: number): Amount => {
  return Amount.fromBN(BN.fromBigInt(value, decimals).addPercent(SWAP_TOKEN_SLIPPAGE_PERCENT))
}

export const estimateOptsWithSlippage = (
  opts: EstimateParams,
  slippage?: number,
): EstimateParams => {
  const params = opts.params
  return {
    ...opts,
    params: {
      ...params,
      slippage: params.slippage ?? slippage ?? DEFAULT_SLIPPAGE,
    },
  }
}

export const parseSlippage = (slippage: number): [string, string] => {
  return [BN.fromRaw(slippage, 2).value, '1000']
}

export const getSlippageParams = (
  amountIn: string,
  decimals: number,
  slippage?: number,
): [string, string] => {
  const amountInRaw = BN.fromBigInt(amountIn, decimals)

  if (amountInRaw.lt(BN.fromBigInt(5, amountInRaw.decimals))) {
    return parseSlippage(LESS_THAN_FIVE_SLIPPAGE)
  }

  if (amountInRaw.lt(BN.fromBigInt(20, amountInRaw.decimals))) {
    return parseSlippage(LESS_THAN_TWENTY_SLIPPAGE)
  }

  return parseSlippage(slippage || DEFAULT_SLIPPAGE)
}

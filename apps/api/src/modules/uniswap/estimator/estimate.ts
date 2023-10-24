import type { EstimatedPrice, EstimateParams } from '@api/types'
import { BadRequestException } from '@nestjs/common'

import {
  createWrapUnwrapEstimate,
  estimateOptsWithSlippage,
  handleNativeTokens,
  isUnwrapOnly,
  isWrapOnly,
} from './helpers'
import { estimateTraderJoe } from './joe-trader'
import { estimatePancakeSwap } from './pancake-swap'
import { estimateQuickSwap } from './quick-swap'
import { estimateUniswapV3 } from './uniswap-v3'

export const estimate = async (_opts: EstimateParams): Promise<EstimatedPrice> => {
  const { tokens, from, to, params } = _opts

  if (!from || !to) throw new BadRequestException('Invalid token pair')

  const { from: fromHandled, to: toHandled } = handleNativeTokens(tokens, from, to)

  const isUnwrap = isUnwrapOnly(to, toHandled, fromHandled)

  // If this is only wrap\unwrap operation, thus we don't need to estimate price,
  // because wrap\unwrap price is always 1:1
  if (isWrapOnly(from, fromHandled, toHandled) || isUnwrap) {
    return createWrapUnwrapEstimate(from, isUnwrap ? to : fromHandled, params)
  }

  const opts = estimateOptsWithSlippage(_opts)

  if (from.isTraderJoe) return estimateTraderJoe(opts)
  if (from.isPancakeSwap) return estimatePancakeSwap(opts)
  if (from.isQuickSwap) return estimateQuickSwap(opts)

  return estimateUniswapV3(opts)
}

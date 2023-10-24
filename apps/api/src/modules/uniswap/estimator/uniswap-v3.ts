import { EstimatedPrice, EstimateParams } from '@api/types'
import { BN } from '@distributedlab/tools'
import { Amount } from '@rarimo/shared'
import type { Currency } from '@uniswap/sdk-core'
import { CurrencyAmount, Percent, Token as UNIToken, TradeType } from '@uniswap/sdk-core'
import type { RouteWithValidQuote } from '@uniswap/smart-order-router'
import { AlphaRouter, ChainId as UNIChainId } from '@uniswap/smart-order-router'
import { encodeRouteToPath, Route } from '@uniswap/v3-sdk'
import { NotFoundError } from 'rxjs'

import { getAmountInWithSwapSlippage, getSlippageParams, handleNativeTokens } from './helpers'
import { computeRealizedPriceImpact } from './uniswap-impact'

const getRoutePath = (route: RouteWithValidQuote[]) => {
  return route.reduce((path, r) => {
    const p = encodeRouteToPath(r.route as Route<Currency, Currency>, true)
    path += path ? p.replace('0x', '') : p

    return path
  }, '')
}

export const estimateUniswapV3 = async (opts: EstimateParams): Promise<EstimatedPrice> => {
  const { tokens, provider, from: _from, to: _to, params } = opts
  const { from, to } = handleNativeTokens(tokens, _from, _to)

  const amountOut = params.amountOut
  const amountIn = params.amountIn
  const isExactOut = Boolean(amountOut)

  const tokenA = new UNIToken(
    Number(from.chain.id),
    from.address,
    from.decimals,
    from.symbol,
    from.name,
  )

  const tokenB = new UNIToken(Number(from.chain.id), to.address, to.decimals, to.symbol, to.name)
  const amount = CurrencyAmount.fromRawAmount(
    isExactOut ? tokenB : tokenA,
    isExactOut ? amountOut.value : amountIn.value,
  )

  const router = new AlphaRouter({
    chainId: from.chain.id as UNIChainId,
    provider: provider,
  })

  const route = await router.route(
    amount,
    isExactOut ? tokenA : tokenB,
    isExactOut ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT,
  )

  if (!route) throw new NotFoundError('Trade route not found')

  const { estimatedGasUsedUSD, gasPriceWei, trade } = route

  const slippage = new Percent(
    ...getSlippageParams(trade.inputAmount.quotient.toString(), _from.decimals, params.slippage),
  )

  const partialResult = {
    impact: trade ? computeRealizedPriceImpact(trade) : undefined,
    path: [getRoutePath(route.route)],
    gasPriceInUSD: BN.fromBigInt(
      estimatedGasUsedUSD.numerator.toString(),
      estimatedGasUsedUSD.currency.decimals,
    ).toString(),
    gasPrice: BN.fromBigInt(gasPriceWei.toString(), BN.WEI_DECIMALS).toString(),
  }

  if (isExactOut) {
    return {
      ...partialResult,
      amountOut,
      amountIn: getAmountInWithSwapSlippage(
        trade.maximumAmountIn(slippage).quotient.toString(),
        _from.decimals,
      ),
    }
  }

  return {
    ...partialResult,
    amountIn,
    amountOut: Amount.fromBigInt(trade.minimumAmountOut(slippage).quotient.toString(), to.decimals),
  }
}

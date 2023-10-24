import { EstimatedPrice, EstimateParams } from '@api/types'
import { Percent, Token as PCToken, Trade } from '@pancakeswap/sdk'
import { getAllCommonPairs } from '@pancakeswap/smart-router/evm'
import { CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { Amount } from '@rarimo/shared'
import { NotFoundError } from 'rxjs'

import {
  getAmountInWithSwapSlippage,
  getSlippageParams,
  handleNativeTokens,
  TRADE_PARAMS,
} from './helpers'

export const estimatePancakeSwap = async (opts: EstimateParams): Promise<EstimatedPrice> => {
  const { tokens, provider, from: _from, to: _to, params } = opts
  const { from, to } = handleNativeTokens(tokens, _from, _to)

  const amountOut = params.amountOut
  const amountIn = params.amountIn
  const isExactOut = Boolean(amountOut)

  const tokenA = new PCToken(
    Number(from.chain.id),
    from.address,
    from.decimals,
    from.symbol,
    from.name,
  )

  const tokenB = new PCToken(Number(from.chain.id), to.address, to.decimals, to.symbol, to.name)

  const amount = CurrencyAmount.fromRawAmount(
    isExactOut ? tokenB : tokenA,
    isExactOut ? amountOut.value : amountIn.value,
  )

  const pairs = await getAllCommonPairs(tokenA, tokenB, {
    provider: () => provider,
  })

  const [trade] = isExactOut
    ? Trade.bestTradeExactOut(pairs, tokenA, amount, TRADE_PARAMS)
    : Trade.bestTradeExactIn(pairs, amount, tokenB, TRADE_PARAMS)

  if (!trade) throw new NotFoundError('Trade route not found')

  const slippage = new Percent(
    ...getSlippageParams(trade.inputAmount.quotient.toString(), _from.decimals, params.slippage),
  )

  const partialResult = {
    impact: trade.priceImpact.toSignificant(3),
    path: trade.route.path.map(token => token.address),
  }

  if (isExactOut) {
    return {
      ...partialResult,
      amountOut,
      amountIn: getAmountInWithSwapSlippage(
        trade.maximumAmountIn(slippage).numerator.toString(),
        _from.decimals,
      ),
    }
  }

  return {
    ...partialResult,
    amountIn,
    amountOut: Amount.fromBigInt(
      trade.minimumAmountOut(slippage).numerator.toString(),
      to.decimals,
    ),
  }
}

import { EstimatedPrice, EstimateParams } from '@api/types'
import { Amount, EVMDexType } from '@rarimo/shared'
import { Percent, Token as TJToken, TokenAmount, Trade } from '@traderjoe-xyz/sdk'
import { NotFoundError } from 'rxjs'

import {
  getAmountInWithSwapSlippage,
  getSlippageParams,
  handleNativeTokens,
  TRADE_PARAMS,
} from './helpers'
import { getAllPairs } from './pairs'

export const estimateTraderJoe = async (opts: EstimateParams): Promise<EstimatedPrice> => {
  const { tokens, provider, from: _from, to: _to, params, multicallAddress } = opts
  const { from, to } = handleNativeTokens(tokens, _from, _to)
  const amountOut = params.amountOut
  const amountIn = params.amountIn
  const isExactOut = Boolean(amountOut)

  const tokenA = new TJToken(
    Number(from.chain.id),
    from.address,
    from.decimals,
    from.symbol,
    from.name,
  )

  const tokenB = new TJToken(Number(from.chain.id), to.address, to.decimals, to.symbol, to.name)

  const amount = new TokenAmount(
    isExactOut ? tokenB : tokenA,
    isExactOut ? amountOut.value : amountIn.value,
  )

  const pairs = await getAllPairs<TJToken>(provider, multicallAddress, tokenA, tokenB)

  const [trade] = isExactOut
    ? Trade.bestTradeExactOut(pairs, tokenA, amount, TRADE_PARAMS)
    : Trade.bestTradeExactIn(pairs, amount, tokenB, TRADE_PARAMS)

  if (!trade) throw new NotFoundError('Trade route not found')

  const slippage = new Percent(
    ...getSlippageParams(trade.inputAmount.numerator.toString(), _from.decimals, params.slippage),
  )

  const partialResult = {
    impact: trade.priceImpact.toSignificant(3),
    path: trade.route.path.map(token => token.address),
    protocol: EVMDexType.TraderJoe,
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

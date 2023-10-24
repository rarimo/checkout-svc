import { BASE_AVALANCHE_TOKENS, BASE_FUJI_TOKENS, BASE_POLYGON_TOKENS } from '@api/consts'
import { MULTICALL_ABI, UNISWAP_V2_PAIR_ABI, Web3Provider } from '@common'
import {
  Pair as QSPair,
  Token as QSToken,
  TokenAmount as QSTokenAmount,
} from '@rarimo/quickswap-sdk'
import type { ChainId } from '@rarimo/shared'
import { ChainNames, EVM_CHAIN_IDS } from '@rarimo/shared'
import { Pair as TJPair, Token as TJToken, TokenAmount as TJTokenAmount } from '@traderjoe-xyz/sdk'
import { BigNumber, ethers } from 'ethers'

type Token = TJToken | QSToken
type Reserves = [BigNumber, BigNumber]

const GET_RESERVES_SELECTOR = 'getReserves'

export const getAllPairs = async <T = Token, R = T extends TJToken ? TJPair : QSPair>(
  provider: Web3Provider,
  multicallAddress: string,
  tokenA: Token,
  tokenB: Token,
): Promise<R[]> => {
  if (tokenA.chainId !== tokenB.chainId) throw new Error('tokens must have the same chain')
  if (
    !(
      Number(tokenA.chainId) === EVM_CHAIN_IDS[ChainNames.Polygon] ||
      Number(tokenA.chainId) === EVM_CHAIN_IDS[ChainNames.Avalanche] ||
      Number(tokenA.chainId) === EVM_CHAIN_IDS[ChainNames.Fuji]
    )
  ) {
    throw new Error('getAllPairs only supports Polygon and Avalanche, Fuji chains')
  }

  const chainId = Number(tokenA.chainId)
  const isTraderJoe = isAvalancheOrFuji(chainId)

  let bases: Token[] = BASE_POLYGON_TOKENS

  if (isFujiChain(chainId)) {
    bases = BASE_FUJI_TOKENS
  }

  if (isAvalancheChain(chainId)) {
    bases = BASE_AVALANCHE_TOKENS
  }

  const tokenConstructor = isTraderJoe ? TJToken : QSToken

  const token0 = new tokenConstructor(
    chainId as never,
    tokenA.address,
    tokenA.decimals,
    tokenA.symbol,
    tokenA.name,
  )

  const token1 = new tokenConstructor(
    chainId as never,
    tokenB.address,
    tokenB.decimals,
    tokenB.symbol,
    tokenB.name,
  )

  const basePairs = bases.flatMap((base): [Token, Token][] =>
    bases.map(otherBase => [base, otherBase]),
  )

  const allPairCombinations = getAllPairCombinations(token0, token1, bases, basePairs)

  const pairAddressesMap = allPairCombinations.reduce<{
    [key: string]: { token0: Token; token1: Token }
  }>((acc, pair) => {
    const pairAddress = isTraderJoe
      ? TJPair.getAddress(pair[0] as TJToken, pair[1] as TJToken, chainId)
      : QSPair.getAddress(pair[0] as QSToken, pair[1] as QSToken)

    acc[pairAddress] = { token0: pair[0], token1: pair[1] }
    return acc
  }, {})

  const multicallContract = new ethers.Contract(multicallAddress, MULTICALL_ABI, provider)
  const pair = new ethers.utils.Interface(UNISWAP_V2_PAIR_ABI)
  const encodeFunctionData = pair.encodeFunctionData(GET_RESERVES_SELECTOR, [])
  const callData = Object.keys(pairAddressesMap).map(i => ({
    target: i,
    callData: encodeFunctionData,
  }))
  const { returnData } = await multicallContract.callStatic.aggregate(callData)

  return returnData.reduce((acc, i, idx) => {
    if (i === '0x') return acc

    const reserves = pair.decodeFunctionResult(GET_RESERVES_SELECTOR, i) as Reserves
    const pairAddress = callData[idx].target
    const tokenMap = pairAddressesMap[pairAddress]
    const tokenA = tokenMap.token0
    const tokenB = tokenMap.token1
    const [_token0, _token1] = tokenA.sortsBefore(tokenB as never)
      ? [tokenA, tokenB]
      : [tokenB, tokenA]

    acc.push(createPair(chainId, _token0, _token1, reserves))

    return acc
  }, [])
}

const createPair = (chainId: ChainId, tokenA: Token, tokenB: Token, reserves: Reserves) => {
  return isAvalancheOrFuji(tokenA.chainId)
    ? createTraderJoePair(chainId, tokenA as TJToken, tokenB as TJToken, reserves)
    : createQuickSwapPair(tokenA as QSToken, tokenB as QSToken, reserves)
}

const createQuickSwapPair = (tokenA: QSToken, tokenB: QSToken, reserves: Reserves) => {
  return new QSPair(
    new QSTokenAmount(tokenA, reserves[0].toBigInt()),
    new QSTokenAmount(tokenB, reserves[1].toBigInt()),
  )
}

const createTraderJoePair = (
  chainId: ChainId,
  tokenA: TJToken,
  tokenB: TJToken,
  reserves: Reserves,
) => {
  return new TJPair(
    new TJTokenAmount(tokenA, reserves[0].toString()),
    new TJTokenAmount(tokenB, reserves[1].toString()),
    Number(chainId),
  )
}

const isFujiChain = (chain: ChainId) => Number(chain) === EVM_CHAIN_IDS[ChainNames.Fuji]
const isAvalancheChain = (chain: ChainId) => Number(chain) === EVM_CHAIN_IDS[ChainNames.Avalanche]
const isAvalancheOrFuji = (chain: ChainId) => isAvalancheChain(chain) || isFujiChain(chain)

const getAllPairCombinations = (
  tokenA: Token | undefined,
  tokenB: Token | undefined,
  bases: Token[],
  basePairs: [Token, Token][],
): [Token, Token][] => {
  return tokenA && tokenB
    ? [
        [tokenA, tokenB],
        ...bases.map((base): [Token, Token] => [tokenA, base]),
        ...bases.map((base): [Token, Token] => [tokenB, base]),
        ...basePairs,
      ]
        .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
        .filter(([t0, t1]) => t0.address !== t1.address)
    : []
}

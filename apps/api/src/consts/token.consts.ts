import { Token as QSToken } from '@rarimo/quickswap-sdk'
import { ChainNames, EVM_CHAIN_IDS } from '@rarimo/shared'
import { Token as TJToken } from '@traderjoe-xyz/sdk'

const AVALANCHE_CHAIN_ID = Number(EVM_CHAIN_IDS[ChainNames.Avalanche])
const FUJI_CHAIN_ID = Number(EVM_CHAIN_IDS[ChainNames.Fuji])
const POLYGON_CHAIN_ID = Number(EVM_CHAIN_IDS[ChainNames.Polygon])

export const WAVAX_AVALANCHE = new TJToken(
  AVALANCHE_CHAIN_ID,
  '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  18,
  'WAVAX',
  'Wrapped AVAX',
)

export const USDC_AVALANCHE = new TJToken(
  AVALANCHE_CHAIN_ID,
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  6,
  'USDC',
  'USD Coin',
)

export const USDT_AVALANCHE = new TJToken(
  AVALANCHE_CHAIN_ID,
  '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
  6,
  'USDT',
  'Tether Token',
)

export const JOE_AVALANCHE = new TJToken(
  AVALANCHE_CHAIN_ID,
  '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
  18,
  'JOE',
  'JoeToken',
)

export const WETH_AVALANCHE = new TJToken(
  AVALANCHE_CHAIN_ID,
  '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  18,
  'WETH.e',
  'Wrapped Ether',
)

export const WMATIC_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  18,
  'WMATIC',
  'Wrapped Matic',
)

export const USDC_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  6,
  'USDC',
  'USD Coin',
)

export const USDT_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  6,
  'USDT',
  'Tether USD',
)

export const WBTC_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const WETH_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  18,
  'WETH',
  'Wrapped Ether',
)

export const DAI_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin',
)

export const QUICK_POLYGON = new QSToken(
  POLYGON_CHAIN_ID,
  '0xB5C064F955D8e7F38fE0460C556a72987494eE17',
  18,
  'QUICK(NEW)',
  'QuickSwap(NEW)',
)

export const USDC_FUJI = new TJToken(
  FUJI_CHAIN_ID,
  '0xB6076C93701D6a07266c31066B298AeC6dd65c2d',
  6,
  'USDC',
  'USD Coin',
)

export const WAVAX_FUJI = new TJToken(
  FUJI_CHAIN_ID,
  '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  18,
  'WAVAX',
  'Wrapped AVAX',
)

export const JOE_FUJI = new TJToken(
  FUJI_CHAIN_ID,
  '0x477Fd10Db0D80eAFb773cF623B258313C3739413',
  18,
  'JOE',
  'JoeToken',
)

export const WETH_FUJI = new TJToken(
  FUJI_CHAIN_ID,
  '0x1886D09C9Ade0c5DB822D85D21678Db67B6c2982',
  18,
  'WETH',
  'Wrapped Ether',
)

export const BASE_FUJI_TOKENS = [USDC_FUJI, WAVAX_FUJI, JOE_FUJI, WETH_FUJI]

export const BASE_AVALANCHE_TOKENS = [
  WAVAX_AVALANCHE,
  USDC_AVALANCHE,
  USDT_AVALANCHE,
  JOE_AVALANCHE,
  WETH_AVALANCHE,
]

export const BASE_POLYGON_TOKENS = [
  QUICK_POLYGON,
  WBTC_POLYGON,
  DAI_POLYGON,
  WETH_POLYGON,
  WMATIC_POLYGON,
  USDC_POLYGON,
  USDT_POLYGON,
]

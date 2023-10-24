import { NodeEnv } from '@common/enums'
import { Config } from '@common/types'
import { ChainNames, EVM_CHAIN_IDS } from '@rarimo/shared'
import * as joi from 'joi'

const logFileRE = /[a-zA-Z1-9_.]\.log/

const rpcConfig = joi.object().keys({
  chainId: joi
    .number()
    .equal(...Object.values(EVM_CHAIN_IDS))
    .required(),
  name: joi
    .string()
    .equal(...Object.values(ChainNames))
    .required(),
  url: joi.string().required(),
})

const rpc = joi.array().items(rpcConfig)

export const validationSchema = joi.object<Config>({
  rpc,
  uniswap: {
    multicallAddress: joi.string().required(),
    ttl: joi.number().required(),
  },
  nodeEnv: joi
    .string()
    .equal(...Object.values(NodeEnv))
    .default(NodeEnv.Development),
  app: {
    name: joi.string().required(),
    host: joi.string().allow('').required(),
    port: joi.number().default(3000).required(),
    globalPrefix: joi.string().default('v1'),
  },
  log: {
    errorFile: joi.string().optional().allow('').pattern(logFileRE),
    combinedFile: joi.string().optional().pattern(logFileRE),
    level: joi.string().equal('debug', 'info').default('info'),
    inJson: joi.boolean().equal(true, false).default(false),
  },
  dex: {
    tokensTTL: joi.number().required(),
    chainsTTL: joi.number().required(),
  },
})

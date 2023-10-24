export type ChainDetails = {
  type: 'chain'
  id: string
  bridge_contract: string
  chain_params: {
    chain_id: number
    explorer_url: string
    native_symbol: string
  }
  chain_type: string
  icon: string
  name: string
  tokens: {
    type: 'token'
    id: string
  }[]
  relationshipNames: string[]
}

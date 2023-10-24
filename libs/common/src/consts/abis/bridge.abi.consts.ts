export const BRIDGE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'bundle',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'network',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'receiver',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isWrapped',
        type: 'bool',
      },
    ],
    name: 'DepositedERC1155',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'bundle',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'network',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'receiver',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isWrapped',
        type: 'bool',
      },
    ],
    name: 'DepositedERC20',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'bundle',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'network',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'receiver',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isWrapped',
        type: 'bool',
      },
    ],
    name: 'DepositedERC721',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'bundle',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'network',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'receiver',
        type: 'string',
      },
    ],
    name: 'DepositedNative',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'bundle',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'network',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'receiver',
        type: 'string',
      },
    ],
    name: 'DepositedSBT',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'P',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'signer_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'bundleImplementation_',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'chainName_',
        type: 'string',
      },
    ],
    name: '__Bridge_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bundleExecutorImplementation_',
        type: 'address',
      },
    ],
    name: '__Bundler_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'signer_',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'chainName_',
        type: 'string',
      },
    ],
    name: '__Signers_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bundleExecutorImplementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'chainName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'signature_',
        type: 'bytes',
      },
    ],
    name: 'changeBundleExecutorImplementation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'newSignerPubKey_',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'signature_',
        type: 'bytes',
      },
    ],
    name: 'changeSigner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount_',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'network_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'receiver_',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'depositERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount_',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'network_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'receiver_',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'network_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'receiver_',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'depositERC721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'network_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'receiver_',
        type: 'string',
      },
    ],
    name: 'depositNative',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'network_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'receiver_',
        type: 'string',
      },
    ],
    name: 'depositSBT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'salt_',
        type: 'bytes32',
      },
    ],
    name: 'determineProxyAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum IBridge.MethodId',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxiableUUID',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'signer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'signature_',
        type: 'bytes',
      },
    ],
    name: 'upgradeToWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'usedHashes',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'originHash_',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'withdrawERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'withdrawERC1155Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'originHash_',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'withdrawERC20Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'originHash_',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'withdrawERC721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bool',
        name: 'isWrapped_',
        type: 'bool',
      },
    ],
    name: 'withdrawERC721Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'originHash_',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
    ],
    name: 'withdrawNative',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    name: 'withdrawNativeBundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'originHash_',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'receiver_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
    ],
    name: 'withdrawSBT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'tokenData_',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'bundle',
            type: 'bytes',
          },
        ],
        internalType: 'struct IBundler.Bundle',
        name: 'bundle_',
        type: 'tuple',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    name: 'withdrawSBTBundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

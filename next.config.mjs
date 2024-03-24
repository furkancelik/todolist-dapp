/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DEFAULT_NETWORK: "0xaa36a7",
    DEFAULT_WALLET: "Pelagus",

    // # Sepolia Testnet
    networkParams: {
      chainId: "0xaa36a7", // Ropsten test ağının chain ID'si
      chainName: "Sepolia",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/demo"],
      blockExplorerUrls: [""],
    },

    // # Localhost
    // networkParams: {
    //   chainId: "0x539", // Ropsten test ağının chain ID'si
    //   chainName: "TodoApp Test",
    //   nativeCurrency: {
    //     name: "Ether",
    //     symbol: "ETH",
    //     decimals: 18,
    //   },
    //   rpcUrls: ["HTTP://127.0.0.1:7545"],
    //   blockExplorerUrls: [""],
    // },
  },
};

// 0x539;

export default nextConfig;

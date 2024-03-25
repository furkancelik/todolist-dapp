/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DEFAULT_WALLET: "Pelagus", // Pelagus || Metamask
    DEFAULT_NETWORK: "0xaa36a7", // ETH

    // # Sepolia Testnet
    "networkParams.chainId": "0xaa36a7",
    "networkParams.chainName": "Sepolia",
    "networkParams.nativeCurrency.name": "Ether",
    "networkParams.nativeCurrency.symbol": "ETH",
    "networkParams.nativeCurrency.decimals": "18",
    "networkParams.rpcUrls": "https://eth-sepolia.g.alchemy.com/v2/demo",
    "networkParams.blockExplorerUrls": "",

    // # Localhost
    // "networkParams.chainId": "0x539",
    // "networkParams.chainName": "TodoApp Test",
    // "networkParams.nativeCurrency.name": "Ether",
    // "networkParams.nativeCurrency.symbol": "ETH",
    // "networkParams.nativeCurrency.decimals": "18",
    // "networkParams.rpcUrls": "HTTP://127.0.0.1:7545",
    // "networkParams.blockExplorerUrls": "",
  },
};

export default nextConfig;

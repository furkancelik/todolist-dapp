"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";

import { contractABI, contractAddress } from "@/utils/contractInfo";

const EthereumContext = createContext({});

export function useEthereum() {
  return useContext(EthereumContext);
}

export const EthereumProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // connectWallet();
    detectPelagus();
  }, []);

  const connectWallet = async () => {
    changeNetwork();
    // getCurrentNetwork();
    const ethereumProvider = new ethers.BrowserProvider(window.ethereum);
    setProvider(ethereumProvider);
    const ethereumSigner = await ethereumProvider.getSigner();
    setSigner(ethereumSigner);
    setUserAddress(await ethereumSigner.getAddress());

    const ethereumContract = new ethers.Contract(
      contractAddress,
      contractABI,
      ethereumProvider
    );
    setContract(ethereumContract);

    // setBalance(formatEther(await ethereumProvider.getBalance("ethers.eth")));
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setUserAddress("");
    setContract(null);
  };

  const changeNetwork = async (networkParams = process.env.networkParams) => {
    try {
      // MetaMask'ta ağ değiştirmeyi dene
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkParams.chainId }],
      });
    } catch (switchError) {
      // Bu hata kodu, ağın MetaMask'te tanımlı olmadığını gösterir
      if (switchError.code === 4902) {
        try {
          // Ağ MetaMask'te yoksa, kullanıcıdan yeni ağı eklemesini iste
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkParams],
          });
        } catch (addError) {
          // Kullanıcı yeni ağı eklemeyi reddederse veya başka bir hata olursa
          console.error("Could not add the network:", addError);
        }
      } else {
        // Diğer hatalar
        console.error("Could not switch to the network:", switchError);
      }
    }
  };

  async function detectPelagus() {
    if (window.ethereum && window.ethereum.isPelagus === true) {
      console.log("AAAAAAA");
      // Provider is Pelagus
      const provider = window.ethereum;
      return provider;
    } else if (window.ethereum && window.ethereum.isPelagus === undefined) {
      // Provider is not Pelagus
      console.log("BBBBBBBBBBB");
      return;
    } else {
      console.log("CCCCCCC");
      // Provider is not detected
      return;
    }
  }

  return (
    <EthereumContext.Provider
      value={{
        // balance,
        provider,
        signer,
        userAddress,
        contract,
        disconnectWallet,
        connectWallet,
        changeNetwork,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};

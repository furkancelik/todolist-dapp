"use client";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";

import { contractABI, contractAddress } from "@/utils/contractInfo";

const EthereumContext = createContext({});

import { getShardFromAddress } from "quais/lib/utils";
import { quais } from "quais";
import { useModal } from "./ModalContext";

const sortedQuaiShardNames = {
  "zone-0-0": { name: "Cyprus-1", rpcName: "cyprus1" },
  "zone-0-1": { name: "Cyprus-2", rpcName: "cyprus2" },
  "zone-0-2": { name: "Cyprus-3", rpcName: "cyprus3" },
  "zone-1-0": { name: "Paxos-1", rpcName: "paxos1" },
  "zone-1-1": { name: "Paxos-2", rpcName: "paxos2" },
  "zone-1-2": { name: "Paxos-3", rpcName: "paxos3" },
  "zone-2-0": { name: "Hydra-1", rpcName: "hydra1" },
  "zone-2-1": { name: "Hydra-2", rpcName: "hydra2" },
  "zone-2-2": { name: "Hydra-3", rpcName: "hydra3" },
};

const buildRpcUrl = (shardName) => {
  return `https://rpc.${shardName}.colosseum.quaiscan.io/`;
};

export function useEthereum() {
  return useContext(EthereumContext);
}

export const EthereumProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);
  const { showModal } = useModal();

  useEffect(() => {
    // https://rpc.cyprus1.colosseum.quaiscan.io/
    connectWallet();
  }, []);

  const connectWalletCC = async () => {
    try {
      const pelagusProvider = window.ethereum.providers?.find(
        (provider) => provider.isPelagus
      );
      const provider = new quais.providers.Web3Provider(
        pelagusProvider || window.ethereum
      );

      const accounts = await provider.send("quai_requestAccounts");
      const shard = quais.utils.getShardFromAddress(accounts[0]);
      setUserAddress(accounts[0]);
      const rpcProvider = new quais.providers.JsonRpcProvider(
        buildRpcUrl(sortedQuaiShardNames[shard].rpcName)
      );
      const signer = await rpcProvider.getSigner();
      setProvider(rpcProvider);
      setSigner(signer);
      setBalance(
        quais.utils.formatEther(await provider.getBalance(accounts[0]))
      );

      const contract = new quais.Contract(
        contractAddress,
        contractABI,
        provider
      );
      setContract(contract);

      const contractWithSigner = contract.connect(signer);
    } catch (e) {
      showModal({
        title: "Connect to ToDo List",
        content: () => (
          <div className="text-center pt-4">
            <div className="pb-4">
              You must connect your wallet to use the application.
              <br /> You can use Pelagus Wallet for the QUAI network.
              <br /> You can use the link below to download it.
            </div>
            <hr />
            <div className="pt-4 ">
              <a
                target="_blank"
                href="https://chromewebstore.google.com/detail/pelagus/gaegollnpijhedifeeeepdoffkgfcmbc"
                className="flex flex-1 w-full p-3 rounded-xl cursor-pointer items-center justify-between bg-gray-100"
              >
                <div className="flex items-center text-md font-semibold">
                  <Image
                    src="/pelagus.png"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  Pelagus Wallet
                </div>
                <div className="text-sm text-gray-500">🔥 Populer</div>
              </a>
            </div>
          </div>
        ),
      });
    }
  };

  const connectWallet = async () => {
    try {
      const pelagusProvider = window.ethereum.providers?.find(
        (provider) => provider.isPelagus
      );

      const provider = new quais.providers.Web3Provider(
        pelagusProvider || window.ethereum
      );

      // const provider = new quais.providers.JsonRpcProvider(
      //   "https://rpc.cyprus1.colosseum.quaiscan.io"
      // );

      const accounts = await window.ethereum.request({
        method: "quai_requestAccounts",
      });
      setProvider(provider);
      const signer = await provider.getSigner();
      setSigner(signer);
      setBalance(
        quais.utils.formatEther(await provider.getBalance(accounts[0]))
      );
      setUserAddress(accounts[0]);
      const contract = new quais.Contract(
        contractAddress,
        contractABI,
        provider
      );
      setContract(contract);
    } catch (e) {
      showModal({
        title: "Connect to ToDo List",
        content: () => (
          <div className="text-center pt-4">
            <div className="pb-4">
              You must connect your wallet to use the application.
              <br /> You can use Pelagus Wallet for the QUAI network.
              <br /> You can use the link below to download it.
            </div>
            <hr />
            <div className="pt-4 ">
              <a
                target="_blank"
                href="https://chromewebstore.google.com/detail/pelagus/gaegollnpijhedifeeeepdoffkgfcmbc"
                className="flex flex-1 w-full p-3 rounded-xl cursor-pointer items-center justify-between bg-gray-100"
              >
                <div className="flex items-center text-md font-semibold">
                  <Image
                    src="/pelagus.png"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  Pelagus Wallet
                </div>
                <div className="text-sm text-gray-500">🔥 Populer</div>
              </a>
            </div>
          </div>
        ),
      });
    }
  };

  const connectWalletPelagus = async () => {
    const provider =
      window.ethereum.providers?.find((provider) => provider.isPelagus) ||
      window.ethereum;
    if (provider?.isPelagus) {
      const web3provider = new quais.providers.Web3Provider(provider);
      const accounts = await window.ethereum.request({
        method: "quai_requestAccounts",
      });

      const signer = await web3provider.getSigner();
      setSigner(signer);
      setProvider(web3provider);
      setUserAddress(accounts[0]);
    } else {
      //Cüzdan yok
    }
  };

  const connectWalletMM = async () => {
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
          alert(`An unexpected error occurred! ${addError} `);
        }
      } else {
        // Diğer hatalar
        alert(`An unexpected error occurred! ${switchError} `);
      }
    }
  };

  return (
    <EthereumContext.Provider
      value={{
        balance,
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

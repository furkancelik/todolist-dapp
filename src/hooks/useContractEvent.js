import { useEthereum } from "@/context/EthereumContext";
import { useEffect, useContext } from "react";

const useContractEvent = (eventName, handleEvent) => {
  const { contract } = useEthereum();

  useEffect(() => {
    if (!contract) return;

    const eventListener = (...args) => {
      handleEvent(...args);
    };

    contract.on(eventName, eventListener);

    return () => {
      contract.off(eventName, eventListener);
    };
  }, [contract, eventName]);
};

export default useContractEvent;

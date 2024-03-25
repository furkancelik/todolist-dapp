import { useEthereum } from "@/context/EthereumContext";
const { pollFor } = require("quais-polling");

const usePollFor = () => {
  const { provider } = useEthereum();

  async function main(
    transactionHash,
    callbackFunc = () => {},
    errorFunc = () => {}
  ) {
    try {
      const receipt = await pollFor(
        provider,
        "getTransactionReceipt",
        [transactionHash],
        1.5,
        1
      );
      if (receipt.transactionHash) callbackFunc();
    } catch (error) {
      alert(`An unexpected error occurred! ${error}`);
      errorFunc();
    }
  }

  return { pollFor: main };
};

export default usePollFor;

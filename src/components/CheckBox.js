import { useState, useEffect, useRef } from "react";
import { useEthereum } from "@/context/EthereumContext";
import Loading from "./Loading";
import useContractEvent from "@/hooks/useContractEvent";

export default function CheckBox({ taskId, activeValue, setTasks }) {
  const [value, setValue] = useState(activeValue);
  const [loading, setLoading] = useState(false);
  const { userAddress, provider, signer, contract } = useEthereum();
  const prevActiveValueRef = useRef();

  useEffect(() => {
    if (prevActiveValueRef.current !== activeValue && loading) {
      setLoading(false);
      setValue(!value);
    }

    prevActiveValueRef.current = activeValue;
  }, [activeValue]);

  async function toggleCompleted(taskId) {
    if (!contract || !signer) return;
    // Signer ile kontratı güncelleyin (yazma işlemi)
    try {
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.toggleCompleted(taskId);
      await tx.wait();
    } catch (e) {
      setLoading(false);
    }
  }

  if (loading) return <Loading color="text-sky-500" />;
  return (
    <div
      onClick={() => {
        const message = value
          ? "Are you sure you want to put the task on the to-do list?"
          : "Are you sure you want to complete the task?";

        if (confirm(message)) {
          // setValue(!value);
          setLoading(true);
          toggleCompleted(taskId);
        } else {
          return false;
        }
      }}
      className={`border-2  w-[24px] h-[24px]  flex items-center justify-center rounded-md mr-3 ${
        value === false ? "border-sky-500" : "border-gray-400"
      }`}
    >
      {value && (
        <div
          className={` w-[12px] h-[12px] rounded-sm ${
            value === false ? "bg-sky-600" : "bg-gray-500"
          }`}
        />
      )}
    </div>
  );
}

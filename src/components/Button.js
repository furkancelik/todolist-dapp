"use client";

import { useEthereum } from "../context/EthereumContext";

export default function Button({
  disabled = false,
  onClick,
  className,
  size,
  condition,
  children,
}) {
  const { userAddress, provider, signer } = useEthereum();
  console.log(condition);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-${size} p-2 rounded-lg ${className}  
      ${disabled ? "opacity-40" : ""} 
      ${
        typeof condition !== "undefined"
          ? condition
            ? "bg-sky-400 text-white"
            : "text-sky-600"
          : ""
      }
      `}

      // className={`text-xs p-2 rounded-lg ${
      //   showComplatedTask === "all" ? "bg-sky-400 text-white" : "text-sky-600"
      // }`}
    >
      {children}
    </button>
  );
}

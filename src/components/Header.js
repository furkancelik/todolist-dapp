import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { useEthereum } from "../context/EthereumContext";

export default function Header() {
  const {
    userAddress,
    provider,
    disconnectWallet,
    connectWallet,
    signer,
    contract,
    changeNetwork,
  } = useEthereum();
  const [showModal, setShowModal] = useState(false);
  const [chainId, setChainId] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    getCurrentNetwork();
  }, [provider, window, window.ethereum]);

  const getCurrentNetwork = async () => {
    try {
      // Mevcut ağın chain ID'sini al
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(chainId);
      // Chain ID'ye göre ağ bilgisini döndür
      // switch (chainId) {
      //   case "0x1":
      //     console.log("This is the Ethereum Main Network.");
      //     break;
      //   case "0x3":
      //     console.log("This is the Ropsten Test Network.");
      //     break;
      //   case "0x4":
      //     console.log("This is the Rinkeby Test Network.");
      //     break;
      //   case "0x5":
      //     console.log("This is the Goerli Test Network.");
      //     break;
      //   case "0x2a":
      //     console.log("This is the Kovan Test Network.");
      //     break;
      //   case "0xaa36a7":
      //     console.log("This is the Sepoli Test Network.");
      //     break;
      //   case "0x539":
      //     console.log("This is the TODOAPP Test Network.");
      //     break;
      //   default:
      //     console.log("This is an unknown network.");
      // }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  function renderChainId() {
    // Chain ID'ye göre ağ bilgisini döndür
    switch (chainId) {
      case process.env.DEFAULT_NETWORK:
        return <div>Sepoli ETH</div>;
      default:
        return <div>Wrong Network</div>;
    }
  }

  return (
    <>
      <div className="absolute right-4 top-3 flex pt-2">
        <Button
          onClick={() => {
            if (chainId !== process.env.DEFAULT_NETWORK) {
              changeNetwork();
              getCurrentNetwork();
            }
          }}
          className={`p-2 pr-4 rounded-lg bg-white ${
            chainId === process.env.DEFAULT_NETWORK
              ? "text-sky-600"
              : "text-red-600"
          } font-bold mr-4 inline-flex `}
          // className={"text-white font-bold mr-4  px-6  "}
        >
          {chainId === process.env.DEFAULT_NETWORK ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.9999 0 4.62988 12.2201 11.9999 16.5743 19.3699 12.2201 11.9999 0ZM11.9999 24 4.62988 13.6172 11.9999 18 19.3699 13.6172 11.9999 24Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path d="M17.657 14.8284L16.2428 13.4142L17.657 12C19.2191 10.4379 19.2191 7.90526 17.657 6.34316C16.0949 4.78106 13.5622 4.78106 12.0001 6.34316L10.5859 7.75737L9.17171 6.34316L10.5859 4.92895C12.9291 2.5858 16.7281 2.5858 19.0712 4.92895C21.4143 7.27209 21.4143 11.0711 19.0712 13.4142L17.657 14.8284ZM14.8286 17.6569L13.4143 19.0711C11.0712 21.4142 7.27221 21.4142 4.92907 19.0711C2.58592 16.7279 2.58592 12.9289 4.92907 10.5858L6.34328 9.17159L7.75749 10.5858L6.34328 12C4.78118 13.5621 4.78118 16.0948 6.34328 17.6569C7.90538 19.219 10.438 19.219 12.0001 17.6569L13.4143 16.2427L14.8286 17.6569ZM14.8286 7.75737L16.2428 9.17159L9.17171 16.2427L7.75749 14.8284L14.8286 7.75737ZM5.77539 2.29291L7.70724 1.77527L8.74252 5.63897L6.81067 6.15661L5.77539 2.29291ZM15.2578 18.3611L17.1896 17.8434L18.2249 21.7071L16.293 22.2248L15.2578 18.3611ZM2.29303 5.77527L6.15673 6.81054L5.63909 8.7424L1.77539 7.70712L2.29303 5.77527ZM18.3612 15.2576L22.2249 16.2929L21.7072 18.2248L17.8435 17.1895L18.3612 15.2576Z"></path>
            </svg>
          )}
          {renderChainId()}
        </Button>

        {userAddress ? (
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            className={"p-2 px-6 rounded-lg bg-white text-sky-600 font-bold "}
          >
            {`${userAddress.slice(0, 7)}....${userAddress.slice(
              userAddress.length - 5,
              userAddress.length
            )}`}
          </Button>
        ) : (
          <Button
            onClick={connectWallet}
            className={"p-2 px-6 rounded-lg bg-white text-sky-600 font-bold "}
          >
            Connect Wallet
          </Button>
        )}
      </div>

      {showModal && (
        <div
          ref={modalRef}
          onClick={(e) => {
            if (modalRef.current === e.target) {
              setShowModal(false);
            }
          }}
          className="bg-black/80 w-full h-full absolute z-10 flex items-center justify-center"
        >
          <div className="bg-white p-5  rounded-2xl min-w-96 xs:min-w-[100%]">
            <div className="flex justify-between">
              <h2 className=" text-xl font-bold">Cüzdan Ayarları</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="w-[35px] h-[35px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[20px] h-[20px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="py-4">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex w-[64px] h-[64px] bg-yellow-400 items-center justify-center rounded-full text-4xl">
                  🤑
                </div>
                <div className="text-lg font-semibold">{`${userAddress.slice(
                  0,
                  7
                )}....${userAddress.slice(
                  userAddress.length - 5,
                  userAddress.length
                )}`}</div>
              </div>
            </div>
            <hr className="mb-3" />
            <Button
              onClick={() => {
                disconnectWallet();
                setShowModal(false);
              }}
              className={
                "text-red-600 flex bg-gray-100 w-full font-semibold justify-center p-3 hover:bg-red-200"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>{" "}
              Bağlantıyı Kes
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

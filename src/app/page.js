"use client";
import { useEffect, useState } from "react";

import { useEthereum } from "../context/EthereumContext";
import Header from "@/components/Header";
import Item from "@/components/Item";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import useContractEvent from "@/hooks/useContractEvent";

export default function Home() {
  const { userAddress, provider, signer, contract, connectWallet } =
    useEthereum();

  const [showComplatedTask, setShowComplatedTask] = useState("all");

  const [tasks, setTasks] = useState(null);
  const [content, setContent] = useState("");
  const [taskId, setTaskId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    if (userAddress) {
      console.log("Connected:", userAddress);
      fetchTasks();
    }
  }, [userAddress]);

  useContractEvent("TaskCreated", (user, taskId, content, completed) => {
    if (user.toLowerCase() === userAddress.toLowerCase()) {
      setCreateLoading(false);
      setContent("");
      setTasks((prevState) => [...prevState, { content, completed }]);
    }
  });

  useContractEvent("TaskStatusToggled", (user, taskId, completed) => {
    if (user.toLowerCase() === userAddress.toLowerCase()) {
      console.log("OKKKK");
      setTasks((prevState) => {
        console.log("prevState:", prevState);
        return prevState.map((item, index) => {
          if (parseInt(index) == parseInt(taskId)) {
            return { ...item, content: item.content, completed };
          }
          return item;
        });
      });
    }
  });

  useContractEvent("TaskContentEdited", (user, taskId, content) => {
    if (user.toLowerCase() === userAddress.toLowerCase()) {
      setTasks((prevState) => {
        return prevState.map((item, index) => {
          if (parseInt(index) == parseInt(taskId)) {
            return { ...item, completed: item.completed, content };
          }
          return item;
        });
      });
    }
  });

  // useEffect(() => {
  //   const onToggleCompleted = (user, taskId, completed) => {
  //     if (user.toLowerCase() === userAddress.toLowerCase()) {
  //       console.log("DDDDDDDDDDDD");
  //       // setCreateLoading(false);
  //       // setContent("");
  //       // setTasks((prevState) => [...prevState, { content, completed }]);
  //     }
  //   };

  //   if (contract) {
  //     contract.on("TaskCreated", onTaskCreated);
  //     contract.on("TaskStatusToggled", onToggleCompleted);
  //   }
  //   return () => {
  //     if (contract) {
  //       return contract.off("TaskCreated", onTaskCreated);
  //     }
  //     return null;
  //   };
  // }, [contract]);

  async function fetchTasks() {
    if (!contract) return;
    const contractWithSigner = contract.connect(signer);
    setTasks(await contractWithSigner.getTasks());
  }

  async function createTask(content) {
    if (!contract || !signer) return;
    setCreateLoading(true);
    try {
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.createTask(content);
      await tx.wait();
    } catch (e) {
      setCreateLoading(false);
    }
  }

  return (
    <>
      <Header />

      <div className="flex h-screen flex-col">
        <div className="flex flex-col m-auto bg-slate-50 p-5 rounded-xl shadow-2xl min-h-[70%]  max-h-[70%]   xl:w-[40%] sm:w-[50%] w-[70%]">
          <div className="flex px-2 pb-3 border-b-[1px]">
            <h1 className="flex-1 text-3xl text-gray-600 font-semibold">
              ToDo List
            </h1>
            <div className="flex items-center">
              <Button
                disabled={userAddress === ""}
                onClick={() => {
                  setShowComplatedTask(true);
                }}
                condition={showComplatedTask === true}
                size={"xs"}
              >
                Yapılacaklar
              </Button>
              <Button
                disabled={userAddress === ""}
                onClick={() => {
                  setShowComplatedTask(false);
                }}
                condition={showComplatedTask === false}
                size={"xs"}
              >
                Tamamlananlar
              </Button>
              <Button
                disabled={userAddress === ""}
                onClick={() => {
                  setShowComplatedTask("all");
                }}
                className={"-mr-2"}
                condition={showComplatedTask === "all"}
                size={"xs"}
              >
                Tümü
              </Button>
            </div>
          </div>

          <div className="flex flex-col pt-3 pb-2 flex-1 overflow-scroll">
            {userAddress !== "" ? (
              tasks?.map((item, index) => {
                // if (showComplatedTask === "all") return true;
                // return item.completed === showComplatedTask;

                return (
                  <Item
                    hidden={item.completed === showComplatedTask}
                    completed={item.completed}
                    taskId={index}
                    key={`${item.content}-${index}`}
                    setTasks={setTasks}
                  >
                    {item.content}
                  </Item>
                );
              })
            ) : (
              // Array(3)
              //   .fill(null)
              //   .map((v, index) => {
              //     return (
              //       <Item complated={false} key={index}>
              //         In publishing and Tüm hakkı saklıdır
              //         {index}
              //       </Item>
              //     );
              //   })
              <div className="flex flex-1 items-center justify-center">
                İşlem yapabilmek için cüzdanınızı bağlamalısınız.
              </div>
            )}
          </div>

          <div className="flex">
            {userAddress !== "" ? (
              <>
                <input
                  disabled={createLoading}
                  value={content}
                  className="border-2 p-2 flex-1 rounded-md mr-2 disabled:opacity-40 disabled:cursor-no-drop"
                  type="text"
                  placeholder="Görevler"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />{" "}
                <Button
                  disabled={createLoading}
                  onClick={() => {
                    createTask(content);
                  }}
                  className={"bg-sky-500 text-white px-6  text-center"}
                >
                  {createLoading ? <Loading /> : "Kaydet"}
                </Button>
              </>
            ) : (
              <Button
                onClick={connectWallet}
                className={
                  "p-4 px-6  rounded-lg bg-sky-500 text-white font-bold w-full "
                }
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
        <div className="mx-auto -mt-10 pb-5 ">
          <a
            className="mx-2 text-white hover:text-gray-300 text-sm"
            target="_blank"
            href="https://x.com/btcmillionaire3/"
          >
            X (Twitter)
          </a>
          <a
            className="mx-2 text-white hover:text-gray-300 text-sm"
            target="_blank"
            href="https://github.com/furkancelik/"
          >
            GitHub
          </a>
          <a
            className="mx-2 text-white hover:text-gray-300 text-sm"
            target="_blank"
            href="https://t.me/furkancelik32"
          >
            Telegram
          </a>
          {/* <div className="mx-2 mt-2 text-white text-sm text-center">
          Tüm hakkı saklıdır
        </div> */}
        </div>
      </div>
    </>
  );

  return (
    <div>
      {userAddress ? (
        userAddress
      ) : (
        <button onClick={connectWalletHandler}>Connect Wallet</button>
      )}
      <hr />
      <input
        value={content}
        type="text"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button
        onClick={() => {
          createTask(content);
        }}
      >
        Kaydet
      </button>
      <hr />
      Görevler
      {tasks === null && <div>Yükleniyor...</div>}
      <ul>
        {tasks?.map((item, index) => (
          <li key={index}>
            {item.content} - {item.completed ? "Yapıldı" : "Beklemede"}
          </li>
        ))}
      </ul>
      <div>
        <input
          value={taskId}
          type="text"
          onChange={(e) => {
            setTaskId(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            const contractWithSigner = contract.connect(signer);
            const task = await contractWithSigner.getTask(0);
            console.log("task--->", task);
          }}
        >
          Getir
        </button>
      </div>
    </div>
  );
}

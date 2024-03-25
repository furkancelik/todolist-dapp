import { useRef, useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import Loading from "./Loading";
import { useEthereum } from "@/context/EthereumContext";
import usePollFor from "@/hooks/usePollFor";

export default function Item({
  children,
  completed = false,
  taskId,
  setTasks,
  hidden = false,
}) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(children);
  const [loading, setLoading] = useState(false);
  const { userAddress, provider, signer, contract } = useEthereum();
  const prevCildrenRef = useRef();
  const { pollFor } = usePollFor();

  useEffect(() => {
    if (prevCildrenRef.current !== children && loading) {
      setLoading(false);
      setEdit(false);
    }

    prevCildrenRef.current = children;
  }, [children]);

  async function editContent(taskId, content) {
    if (!contract || !signer) return;
    // Signer ile kontratı güncelleyin (yazma işlemi)
    try {
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.editContent(taskId, content);

      await pollFor(
        tx.hash,
        () => {
          setLoading(false);
          setEdit(false);
          setTasks((prevState) => {
            return prevState.map((item, index) => {
              if (parseInt(index) == parseInt(taskId)) {
                return { ...item, completed: item.completed, content: value };
              }
              return item;
            });
          });
        },
        () => {
          alert(`An unexpected error occurred!`);
          setCreateLoading(false);
        }
      );

      await tx.wait();
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <div
      className={`item p-3 border-b-[1px] flex flex-row items-center ${
        hidden ? "hidden" : ""
      }`}
    >
      {edit ? (
        <input
          disabled={loading}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="flex flex-1 px-2 p-1 border-[1px]  border-gray-300 rounded-md mr-2 disabled:opacity-50"
        />
      ) : (
        <>
          <div style={{ width: "34px" }}>
            <CheckBox
              taskId={taskId}
              activeValue={completed}
              setTasks={setTasks}
            />
          </div>
          <p
            className={`flex-1 text-md ${
              completed ? "line-through text-gray-400" : "text-gray-600"
            }`}
          >
            {children}
          </p>
        </>
      )}

      {!edit && (
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="trash cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-emerald-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      )}

      {loading && <Loading color="text-dark" />}
      {edit && (
        <>
          <button
            onClick={() => {
              setEdit(false);
            }}
            className="trash cursor-pointer mx-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              setLoading(true);
              editContent(taskId, value);
            }}
            className="trash cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              fill="currentColor"
              className="w-6 h-6 text-green-600 "
            >
              <path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

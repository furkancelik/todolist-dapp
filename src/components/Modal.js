"use client";

import { useModal } from "@/context/ModalContext";
import { useRef } from "react";

const Modal = () => {
  const modalRef = useRef(null);
  const { isVisible, modalContent, modalTitle, hideModal } = useModal();
  if (!isVisible) return null;

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          hideModal();
        }
      }}
      className="bg-black/80 w-full h-full absolute z-10 flex items-center justify-center"
    >
      <div className="bg-white p-5  rounded-2xl min-w-96 xs:min-w-[100%]">
        <div className="flex justify-between">
          <h2 className=" text-xl font-bold">{modalTitle}</h2>
          <button
            onClick={hideModal}
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

        {modalContent}
      </div>
    </div>
  );
};

export default Modal;

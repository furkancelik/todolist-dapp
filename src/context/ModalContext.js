"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const showModal = ({ content, title }) => {
    setModalContent(content);
    setModalTitle(title);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isVisible, modalTitle, modalContent, showModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

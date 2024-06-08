import { ReactNode, createContext } from "react";

export const ModalContext = createContext<{
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}>({ isOpen: false, openModal: () => {}, closeModal: () => {} });

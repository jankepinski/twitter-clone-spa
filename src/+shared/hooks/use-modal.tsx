import { useContext } from "react";
import { ModalContext } from "../contexts/modal-context";

export const useModal = () => useContext(ModalContext);

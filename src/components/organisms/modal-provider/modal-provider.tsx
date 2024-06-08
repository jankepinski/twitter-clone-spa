import { ModalContext } from "@/+shared/contexts/modal-context";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent>{modalContent}</DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

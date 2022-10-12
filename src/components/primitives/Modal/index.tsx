import {
  ModalContainer,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./Modal.styles";
import { FaTimes } from "react-icons/fa";

export type ModalProps = {
  title: string;
  footer?: any;
  children: React.ReactNode;
  isOpen: boolean;
  hideModal?: () => void;
};

export const Modal = ({
  title,
  footer,
  children,
  isOpen,
  hideModal,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <ModalContainer>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalClose onClick={() => hideModal()}>
                <FaTimes color="white" size={18} />
              </ModalClose>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

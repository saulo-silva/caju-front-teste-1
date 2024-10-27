import { useCallback, useState } from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useModal, create } from "@ebay/nice-modal-react";

import Button from "@/components/Buttons";

const StyledModal = Modal.styled`
  width: 25rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  opacity: ${(props: { $opacity: number; }) => props.$opacity};
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  h2 {
    font-size: 1.125rem;
    margin-right: 16px;
    text-align: center;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

type statusType = "APPROVED" | "REPROVED" | "DELETE" | "REVIEW";

type Props = {
  status: statusType;
}

const ConfirmationModal = create(({ status }: Props) => {
  const modal = useModal();
  const [opacity, setOpacity] = useState(0);

  const optionsLabels = (status: statusType) => {
    switch (status) {
      case "APPROVED":
        return {
          title: "Aprovar",
          confirm: "Aprovar",
          cancel: "Cancelar"
        };
      case "REPROVED":
        return {
          title: "Rejeitar",
          confirm: "Rejeitar",
          cancel: "Cancelar"
        };
      case "REVIEW":
        return {
          title: "Revisar",
          confirm: "Revisar",
          cancel: "Cancelar"
        };
      case "DELETE":
        return {
          title: "Excluir",
          confirm: "Excluir",
          cancel: "Cancelar"
        };
    }
  };

  const { confirm, cancel, title } = optionsLabels(status);

  const handleCloseModal = useCallback((): void => {
    setOpacity(0);
    setTimeout(() => modal.hide(), 300);
  }, [modal]);

  const afterOpen = useCallback((): void => {
    setTimeout(() => setOpacity(1), 100);
  }, []);

  const handleConfirm = useCallback((): void => {
    modal.resolve(true);
    handleCloseModal();
  }, [modal, handleCloseModal]);

  const handleCancel = useCallback((): void => {
    modal.resolve(false);
    handleCloseModal();
  }, [modal, handleCloseModal]);

  // Render

  return (
    <StyledModal
      isOpen={modal.visible}
      onBackgroundClick={handleCloseModal}
      onEscapeKeydown={handleCloseModal}
      afterOpen={afterOpen}
      opacity={opacity}
    >
      <h2>Tem certeza que deseja {title}?</h2>
      <Actions>
        <Button type="button" $variant="primary" onClick={handleConfirm}>{confirm}</Button>
        <Button type="button" $variant="secondary" onClick={handleCancel}>{cancel}</Button>
      </Actions>
    </StyledModal>
  );
});

export default ConfirmationModal;

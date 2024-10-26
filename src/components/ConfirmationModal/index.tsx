import { useCallback, useState } from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useModal, create } from "@ebay/nice-modal-react";

import { ButtonSmall } from "@/components/Buttons";

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

type Props = {
  title: string;
}

const ConfirmationModal = create(({ title }: Props) => {
  const modal = useModal();
  const [opacity, setOpacity] = useState(0);

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

  return (
    <StyledModal
      isOpen={modal.visible}
      onBackgroundClick={handleCloseModal}
      onEscapeKeydown={handleCloseModal}
      afterOpen={afterOpen}
      opacity={opacity}
    >
      <h2>{title}</h2>
      <Actions>
        <ButtonSmall type="button" $bgcolor="#4CAF50" onClick={handleConfirm}>Sim</ButtonSmall>
        <ButtonSmall type="button" $bgcolor="#F44336" onClick={handleCancel}>Cancelar</ButtonSmall>
      </Actions>
    </StyledModal>
  );
});

export default ConfirmationModal;

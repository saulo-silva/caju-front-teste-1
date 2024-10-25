import { useState } from "react";
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  opacity: ${(props: { $opacity: number; }) => props.$opacity};
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

function ConfirmationModal() {
  const [isOpen, setIsOpen] = useState(true)
  const [opacity, setOpacity] = useState(0)

  function toggleModal() {
    setOpacity(0)
    setTimeout(() => setIsOpen(!isOpen), 300)
  }

  function afterOpen() {
    setTimeout(() => setOpacity(1), 100)
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      afterOpen={afterOpen}
      opacity={opacity}>
      <span>I am a modal!</span>
      <button onClick={toggleModal}>Close me</button>
    </StyledModal>
  )
}

export default ConfirmationModal

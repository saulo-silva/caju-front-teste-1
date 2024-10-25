import styled, { keyframes } from "styled-components";
import { useIsFetching } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const RotatingIcon = styled(AiOutlineLoading3Quarters)`
  font-size: 42px;
  color: #ff4500;
  animation: ${rotate} 1s linear infinite;
`;

const LoadingOverlay = () => {
  const isFetching = useIsFetching();

  if (isFetching) {
    return (
      <Overlay>
        <RotatingIcon>Loading...</RotatingIcon>
      </Overlay>
    );
  }

  return null;
};

export default LoadingOverlay;

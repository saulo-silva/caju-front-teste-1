import styled from "styled-components";
import { useIsFetching } from "@tanstack/react-query";

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

const LoadingText = styled.div`
    font-size: 24px;
    color: #333;
`;

const LoadingOverlay = () => {
  const isFetching = useIsFetching();

  if (isFetching) {
    return (
      <Overlay>
        <LoadingText>Loading...</LoadingText>
      </Overlay>
    );
  }

  return null;
};

export default LoadingOverlay;

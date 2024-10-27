import styled, { css } from "styled-components";

type ButtonProps = {
  $variant?: "primary" | "secondary" | "tertiary" | "green";
};

const Button = styled.button<ButtonProps>`
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    cursor: pointer;
    height: 56px;
    font-size: 16px;
    font-weight: 600;

    &:focus {
        outline: 2px solid #000;
        outline-offset: 2px;
    }

    ${(props) =>
            props.$variant === "primary" &&
            css`
                background-color: #e80537;
                color: #fff;

                &:hover {
                    background-color: #a20326;
                }
            `}

    ${(props) =>
            props.$variant === "secondary" &&
            css`
                background-color: transparent;
                border: 1px solid #e80537;
                color: #e80537;

                &:hover {
                    background-color: #fafafa;
                }
            `}
    ${(props) =>
            props.$variant === "green" &&
            css`
                background-color: #59d359;
                color: #000;

                &:hover {
                    background-color: #32be32;
                }
            `}

    ${(props) =>
            props.$variant === "tertiary" &&
            css`
                color: #e80537;
                background-color: transparent;
                border: none;
            `}
`;

export default Button;

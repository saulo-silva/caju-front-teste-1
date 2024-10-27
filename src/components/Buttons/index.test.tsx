import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./index";

describe("Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i })).toBeInTheDocument();
  });

  it("Should apply primary variant styles", () => {
    render(<Button $variant="primary">Primary Button</Button>);
    const button = screen.getByRole("button", { name: /primary button/i });
    expect(button).toHaveStyle("background-color: rgb(162, 3, 38)");
    expect(button).toHaveStyle("color: #fff");
  });

  it("Should apply secondary variant styles", () => {
    render(<Button $variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toHaveStyle("background-color: rgb(250, 250, 250)");
    expect(button).toHaveStyle("border: 1px solid #e80537");
    expect(button).toHaveStyle("color: rgb(232, 5, 55)");
  });

  it("Should apply green variant styles", () => {
    render(<Button $variant="green">Green Button</Button>);
    const button = screen.getByRole("button", { name: /green button/i });
    expect(button).toHaveStyle("background-color: rgb(50, 190, 50)");
    expect(button).toHaveStyle("color: #000");
  });

  it("Should apply tertiary variant styles", () => {
    render(<Button $variant="tertiary">Tertiary Button</Button>);
    const button = screen.getByRole("button", { name: /tertiary button/i });
    expect(button).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
    expect(button).toHaveStyle("color: #e80537");
  });

  it("Should have default styles when no variant is provided", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveStyle("background-color: ButtonFace");
    expect(button).toHaveStyle("color: ButtonText");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./index";

describe("Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i })).toBeInTheDocument();
  });
});

describe("ButtonSmall", () => {
  // it("Should apply the correct background color", () => {
  //   render(<Button $bgcolor="red">Small Button</Button>);
  //   const button = screen.getByRole("button", { name: /small button/i });
  //   expect(button).toHaveStyle("background-color: rgb(255, 0, 0)");
  // });
  //
  // test("Should have a default background-color when bgcolor is not provided", () => {
  //   render(<Button>Test Button</Button>);
  //
  //   const button = screen.getByRole("button", { name: /test button/i });
  //
  //   expect(button).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  // });
});

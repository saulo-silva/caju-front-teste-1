import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {describe, it, expect, vi, Mock} from "vitest";
import NewUserPage from "@/pages/NewUser";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const renderWithProviders = (ui: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
      <Toaster />
    </QueryClientProvider>
  );
};

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

const navigate = vi.fn();
(useNavigate as Mock).mockReturnValue(navigate);

describe("NewUserPage", () => {
  it("Should render the form with all fields", () => {
    renderWithProviders(<NewUserPage />);
    expect(screen.getByTestId("employee-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("cpf-input")).toBeInTheDocument();
    expect(screen.getByTestId("admission-date-input")).toBeInTheDocument();
  });

  it("should render the back button and handle click", () => {
    const { getByTestId } = renderWithProviders(<NewUserPage />);

    const backButton = getByTestId("back-button");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith("/dashboard");
  });

  it("Should navigate to home on successful submission", async () => {
    renderWithProviders(<NewUserPage />);
    fireEvent.change(screen.getByTestId("employee-name-input"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("cpf-input"), { target: { value: "269.421.540-83" } });
    fireEvent.change(screen.getByTestId("admission-date-input"), { target: { value: "2023-01-20" } });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/dashboard");
      expect(screen.getByText("Registro criado com sucesso!", { exact: true })).toBeInTheDocument();
    });
  });

  it("Should format CPF correctly on input change", () => {
    renderWithProviders(<NewUserPage />);
    const cpfInput = screen.getByTestId("cpf-input");

    fireEvent.change(cpfInput, { target: { value: "12345678901" } });
    expect((cpfInput as HTMLInputElement).value).toBe("123.456.789-01");
  });
});

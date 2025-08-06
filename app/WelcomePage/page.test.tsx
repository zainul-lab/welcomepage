import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// Import jest-dom types for custom matchers
import "@testing-library/jest-dom/extend-expect";
import WelcomePage from "./page";
import { ContentProvider } from "../../contexts/LocaleContext";

// Mock next/navigation useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("WelcomePage", () => {
  it("renders English content by default", () => {
    render(
      <ContentProvider>
        <WelcomePage />
      </ContentProvider>
    );
    expect(screen.getByText(/Welcome to BMO Partners Group Private Markets Fund Smart Form/i)).toBeInTheDocument();
    expect(screen.getByText(/This tool will provide you with PDF forms ready for signature or e-signature./i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CONTINUE/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CANCEL/i })).toBeInTheDocument();
  });

  it("switches to French content when Français is selected", () => {
    render(
      <ContentProvider>
        <WelcomePage />
      </ContentProvider>
    );
    fireEvent.click(screen.getByRole("button")); // open dropdown
    fireEvent.click(screen.getByText("Français"));
    expect(screen.getByText(/Bienvenue sur le formulaire intelligent du Fonds de marchés privés BMO Partners Group/i)).toBeInTheDocument();
    expect(screen.getByText(/Cet outil vous fournira des formulaires PDF prêts à être signés ou à être signés électroniquement./i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CONTINUER/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ANNULER/i })).toBeInTheDocument();
  });

  it("shows loading text when Continue is clicked", () => {
    render(
      <ContentProvider>
        <WelcomePage />
      </ContentProvider>
    );
    const continueBtn = screen.getByRole("button", { name: /CONTINUE/i });
    fireEvent.click(continueBtn);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
import RootLayout from "../layouts/RootLayout.jsx";

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
}

test("RootLayout renders its children", () => {
  renderWithProviders(
    <RootLayout>
      <h1 data-testid="child">Hello</h1>
    </RootLayout>
  );
  expect(screen.getByTestId("child")).toHaveTextContent("Hello");
});

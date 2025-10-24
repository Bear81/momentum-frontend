import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";

// pages
import CreateHabit from "../pages/CreateHabit.jsx";
import DeleteHabit from "../pages/DeleteHabit.jsx";
import EditHabit from "../pages/EditHabit.jsx";
import HabitsList from "../pages/HabitsList.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
}

function smoke(Component, name) {
  test(`${name} renders without crashing`, () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    renderWithProviders(<Component />, { container: div });
  });
}

smoke(CreateHabit, "CreateHabit");
smoke(DeleteHabit, "DeleteHabit");
smoke(EditHabit, "EditHabit");
smoke(HabitsList, "HabitsList");
smoke(Home, "Home");
smoke(Login, "Login");
smoke(Register, "Register");

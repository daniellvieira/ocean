import {render, screen} from "@testing-library/react";
import NavBar from "./NavBar.jsx";
import { MemoryRouter } from "react-router-dom";

describe("NavBar component", () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  }

  test("renders both links", () => {
    renderNavBar();

    expect(screen.getByText("Post List")).toBeInTheDocument();
    expect(screen.getByText("New List")).toBeInTheDocument();
  })
});
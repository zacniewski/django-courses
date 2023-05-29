// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import About from "components/AboutComponent";

describe("Register component", () => {
  it("should render About component correctly", () => {
    render(<About />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});

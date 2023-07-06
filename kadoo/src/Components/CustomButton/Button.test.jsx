import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { TalebiButton } from "./Button";

describe("TalebiButton component", () => {
  test("renders with text and icon", () => {
    const { getByRole, getByText } = render(
      <TalebiButton text="Click me" icon={<span>Icon</span>} />
    );
    const buttonElement = getByRole("button");
    const textElement = getByText("Click me");
    const iconElement = getByText("Icon");
    expect(buttonElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test("calls onClick handler when button is clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <TalebiButton text="Click me" onClick={handleClick} />
    );
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  test("disables the button when disabled prop is true", () => {
    const { getByRole } = render(<TalebiButton text="Click me" disabled />);
    const buttonElement = getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});

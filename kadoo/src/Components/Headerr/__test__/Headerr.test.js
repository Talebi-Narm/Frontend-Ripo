import { render, screen } from "@testing-library/react";
import React from "react";

import Headerr from "../index";

test("renders learn react link", async () => {
  // eslint-disable-next-line react/jsx-filename-extension
  render(<Headerr title="My y" />);
  const headerElement = screen.getByText(/My y/i);
  expect(headerElement).toBeInTheDocument();
});
test("renders learn react link", async () => {
  // eslint-disable-next-line react/jsx-filename-extension
  render(<Headerr title="My y" />);
  const headerElement = screen.getByRole("heading");
  expect(headerElement).toBeInTheDocument();
});

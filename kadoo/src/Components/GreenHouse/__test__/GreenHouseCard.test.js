import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GreenHouseCard from "../GreenHouseCard";

jest.mock("@lottiefiles/react-lottie-player", () => ({
  Player: jest.fn(() => null),
}));

describe("GreenHouseCard", () => {
  test("renders card with product details", () => {
    const product = {
      id: 1,
      name: "Test-Product",
      price: "$10.99",
      image: "test-image.jpg",
    };

    const { getByText, getByAltText } = render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Router>
        <GreenHouseCard product={product} />
      </Router>
    );

    expect(getByText("Test-Product")).toBeInTheDocument();
    expect(getByText("$10.99")).toBeInTheDocument();
    expect(getByAltText("picture")).toHaveAttribute("src", "test-image.jpg");
  });

  test("handles remove button click", () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: "$10.99",
      image: "test-image.jpg",
    };

    const { getByTestId } = render(
      <Router>
        <GreenHouseCard product={product} />
      </Router>
    );
    act(() => {
      fireEvent.mouseEnter(getByTestId("card"));
    });

    act(() => {
      fireEvent.click(getByTestId("remove-button"));
    });
  });
});

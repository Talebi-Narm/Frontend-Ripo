import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import CustomProductCard from "./ProductCard";

describe("CustomProductCard", () => {
  const product = {
    name: "Plant",
    image: "https://example.com/plant.jpg",
    water: "Regularly",
    count: 1,
  };
  const onAddPlant = jest.fn();
  const onRemovePlant = jest.fn();

  beforeEach(() => {
    render(
      <CustomProductCard
        product={product}
        onAddPlant={onAddPlant}
        onRemovePlant={onRemovePlant}
      />
    );
  });

  it("renders product name", () => {
    const productName = screen.getByText(product.name);
    expect(productName).toBeInTheDocument();
  });

  it("renders product image", () => {
    const productImage = screen.getByAltText("");
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toEqual(product.image);
  });

  it("renders water info", () => {
    const waterInfo = screen.getByText(product.water);
    expect(waterInfo).toBeInTheDocument();
  });

  it("displays product count and allows incrementing and decrementing", () => {
    const countInput = screen.getByRole("textbox");
    expect(countInput).toHaveValue(product.count);

    const decrementButton = screen.getByLabelText("remove");
    userEvent.click(decrementButton);
    expect(onRemovePlant).toHaveBeenCalledTimes(1);

    const incrementButton = screen.getByLabelText("add");
    userEvent.click(incrementButton);
    expect(onAddPlant).toHaveBeenCalledTimes(1);
  });
});

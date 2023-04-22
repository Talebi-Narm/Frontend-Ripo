import React from "react";

import CustomProductCard from "../../Components/CustomCard/ProductCard";

function TestProductCard() {
  const product = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlT6OCf8Vil8Wqt2TiS2lMKy0mDC7R_2BEp7Fei8Z&s",
    name: "product",
    count: 2,
    water: 1,
    light: 1,
    price: 5,
    growthRate: 4,
  };
  return (
    <div>
      <CustomProductCard product={product} />
    </div>
  );
}

export default TestProductCard;

import React from "react";

import CustomToolCard from "../../Components/CustomCard/ToolProductCard";

function TestToolCard() {
  const toolProduct = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpTGWHxLqUd05gbUnmH3-AC6gE1C8sQgU8ET-BT8u9Dg&s",
    name: "ToolProduct",
    count: 2,
    description: "this is custom tool card",
    price: 5,
  };
  return (
    <div>
      <CustomToolCard toolProduct={toolProduct} />
    </div>
  );
}

export default TestToolCard;

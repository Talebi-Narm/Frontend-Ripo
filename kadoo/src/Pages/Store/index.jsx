// eslint-disable-next-line prettier/prettier
import { React, useEffect, useState } from "react";

// eslint-disable-next-line import/order
import PlantsCart from "../../Components/ProductsCart/PlantsCart";

// import axiosInstancefrom "../../Utils/axios";
import "./style.scss";
import axiosInstance from "../../Utils/axios";

function Store() {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    axiosInstance.get(`v1/store/plants/`).then((res) => {
      setPlants(res.data.results);
    });
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {plants.map((item, index) => (
        <PlantsCart
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          product={{
            image: item.main_image,
            name: item.name,
            price: item.price,
            light: item.light,
            water: item.water,
            growthRate: item.growth_rate,
          }}
        />
      ))}
    </div>
  );
}
export default Store;

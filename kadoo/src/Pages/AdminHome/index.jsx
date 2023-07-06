import React from "react";

import Chart from "../../Components/chart";
import FeaturedInfo from "../../Components/featuredInfo";
import "./style.scss";
import WidgetLg from "../../Components/widgetLg";
import WidgetSm from "../../Components/widgetSm";
import { userData } from "../../Constant/dummyData";

export default function AdminHome() {
  return (
    <div className="homeAdmin">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

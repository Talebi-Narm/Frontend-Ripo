import Chart from "../../Components/chart";
import FeaturedInfo from "../../Components/featuredInfo";
import "./style.scss";
import { userData } from "../../Constant/dummyData";
import WidgetSm from "../../Components/widgetSm";
import WidgetLg from "../../Components/widgetLg";

export default function AdminHome() {
  return (
    <div className="homeAdmin">
      <FeaturedInfo/>
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
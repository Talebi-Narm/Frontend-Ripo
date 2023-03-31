import Chart from "../../Components/chart/Chart";
import FeaturedInfo from "../../Components/featuredInfo/FeaturedInfo";
import "./style.scss";
import { userData } from "../../dummyData";
import WidgetSm from "../../Components/widgetSm";
import WidgetLg from "../../Components/widgetLg/WidgetLg";

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
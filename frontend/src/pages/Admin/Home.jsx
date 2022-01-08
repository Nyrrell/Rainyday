import styled from "styled-components";

import FeaturedInfo from "../../components/Admin/FeaturedInfo.jsx";
import WidgetLg from "../../components/Admin/WidgetLg.jsx";
import WidgetSm from "../../components/Admin/WidgetSm.jsx";
import Chart from "../../components/Admin/Chart.jsx";

import { monthSales } from "../../data.js";

const Container = styled.div`
  flex: 5;
`;

const Widget = styled.div`
  display: flex;
  margin: 20px;
`;

const Home = () => {
  return (
    <Container>
      <FeaturedInfo/>
      <Chart data={monthSales} title={"Analyse des ventes"} dataKey={"total"} grid/>
      <Widget>
        <WidgetSm/>
        <WidgetLg/>
      </Widget>
    </Container>
  );
};

export default Home;
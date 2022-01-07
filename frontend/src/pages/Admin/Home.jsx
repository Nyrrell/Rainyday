import styled from "styled-components";

import FeaturedInfo from "../../components/Admin/FeaturedInfo.jsx";
import WidgetLg from "../../components/Admin/WidgetLg.jsx";
import WidgetSm from "../../components/Admin/WidgetSm.jsx";
import Chart from "../../components/Admin/Chart.jsx";

import { data } from "../../dummyData.js";

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
      <Chart data={data} title={"Analyse des ventes"} dataKey={"uv"} grid/>
      <Widget>
        <WidgetSm/>
        <WidgetLg/>
      </Widget>
    </Container>
  );
};

export default Home;
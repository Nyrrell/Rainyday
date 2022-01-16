import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import FeaturedInfo from "../../components/Admin/FeaturedInfo.jsx";
import WidgetLg from "../../components/Admin/WidgetLg.jsx";
import WidgetSm from "../../components/Admin/WidgetSm.jsx";
import Chart from "../../components/Admin/Chart.jsx";
import { userRequest } from "../../requestApi.js";

const Container = styled.div`
  flex: 5;
`;

const Widget = styled.div`
  display: flex;
  margin: 20px;
`;

const Home = () => {
  const [salesStats, setSalesStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await userRequest.get("/orders/stats");

        data.forEach(item =>
          setSalesStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Ventes": item.total },
          ])
        );
      } catch {
      }
    };
    getStats();
  }, [MONTHS]);


  return (
    <Container>
      <FeaturedInfo/>
      <Chart data={salesStats} title={"Analyse des ventes"} dataKey={"Ventes"} grid/>
      <Widget>
        <WidgetSm/>
        <WidgetLg/>
      </Widget>
    </Container>
  );
};

export default Home;
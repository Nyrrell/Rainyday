import styled from "styled-components";

import WidgetLg from "./WidgetLg.jsx";
import WidgetSm from "./WidgetSm.jsx";

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
      <Widget>
        <WidgetSm/>
        <WidgetLg/>
      </Widget>
    </Container>
  );
};

export default Home;
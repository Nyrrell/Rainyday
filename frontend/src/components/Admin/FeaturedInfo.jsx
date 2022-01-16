import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { userRequest } from "../../requestApi.js";

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.span`
  font-size: 20px;
`;

const MoneyMenu = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const Money = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const MoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;

  & > svg {
    font-size: 15px;
    margin-left: 5px;
  }
`;

const SubTitle = styled.span`
  font-size: 15px;
  color: gray;
`;

styled(ArrowUpward)`
  color: green;
`;
styled(ArrowDownward)`
  color: red;
`;

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const { data } = await userRequest.get("orders/income");
        setIncome(data);
        setPerc((data[1]['total'] * 100) / data[0]['total'] - 100);
      } catch {
      }
    };
    getIncome();
  }, []);

  return (
    <Container>
      <Item>
        <Title>Revenue</Title>
        <MoneyMenu>
          <Money>{income[1]?.['total'] ?? 0} €</Money>
          <MoneyRate>{Math.floor(perc)}{" %"}
            {perc < 0 ? (
              <ArrowDownward color={'success'}/>
            ) : (
              <ArrowUpward color={'error'}/>
            )}</MoneyRate>
        </MoneyMenu>
        <SubTitle>Mois précédent</SubTitle>
      </Item>
      <Item>
        <Title>Vente</Title>
        <MoneyMenu>
          <Money>300€</Money>
          <MoneyRate>- 10 <ArrowDownward/></MoneyRate>
        </MoneyMenu>
        <SubTitle>Mois précédent</SubTitle>
      </Item>
      <Item>
        <Title>Coût</Title>
        <MoneyMenu>
          <Money>300€</Money>
          <MoneyRate positive>+ 10 <ArrowUpward/></MoneyRate>
        </MoneyMenu>
        <SubTitle>Mois précédent</SubTitle>
      </Item>
    </Container>
  );
};

export default FeaturedInfo;
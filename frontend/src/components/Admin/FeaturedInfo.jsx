import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import styled from "styled-components";

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
    color: ${props => props['positive'] ? "green" : "red"};;
  }
`;

const SubTitle = styled.span`
  font-size: 15px;
  color: gray;
`;

const FeaturedInfo = () => {
  return (
    <Container>
      <Item>
        <Title>Revenue</Title>
        <MoneyMenu>
          <Money>3000€</Money>
          <MoneyRate>- 100 <ArrowDownward/></MoneyRate>
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
import styled from "styled-components";

const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;
const Tr = styled.tr``;

const Th = styled.th`
  text-align: left;
`;
const Td = styled.td`
  font-weight: ${props => props['fontWeight']};
`;

const Button = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: ${props => {
    switch (props['type']) {
      case "approuvé" :
          return "#e5faf2"
      case "declined" :
          return "#fff0f1"
      case "pending" :
          return "#ebf1fe"
      default:
        return "gray"
    }
  }};
  color: ${props => {
    switch (props.type) {
      case "approuvé" :
          return "#3bb077"
      case "declined" :
          return "#d95087"
      case "pending" :
          return"#2a7ade"
      default:
        return "white"
    }
  }};
`;

const WidgetLg = () => {

  const Status = ({ type }) => <Button type={type}>{type}</Button>

  return (
    <Container>
      <Title>Dernières transactions</Title>
      <Table>
        <Tr>
          <Th>Client</Th>
          <Th>Date</Th>
          <Th>Montant</Th>
          <Th>Status</Th>
        </Tr>
        <Tr>
          <Td fontWeight={600}>TA MERE</Td>
          <Td fontWeight={300}>1 Jan. 2022</Td>
          <Td fontWeight={300}>25 €</Td>
          <Td><Status type={"approuvé"}/></Td>
        </Tr>
        <Tr>
          <Td fontWeight={600}>TA MERE</Td>
          <Td fontWeight={300}>1 Jan. 2022</Td>
          <Td fontWeight={300}>25 €</Td>
          <Td><Status type={"pending"}/></Td>
        </Tr>
        <Tr>
          <Td fontWeight={600}>TA MERE</Td>
          <Td fontWeight={300}>1 Jan. 2022</Td>
          <Td fontWeight={300}>25 €</Td>
          <Td><Status type={"declined"}/></Td>
        </Tr>
      </Table>
    </Container>
  );
};

export default WidgetLg;
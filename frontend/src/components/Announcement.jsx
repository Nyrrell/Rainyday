import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
`;

const Announcement = ({ promo }) => {
  promo = {
    title: 'OUI',
    percentage: '20'
  }

  return (
    <Container>
      {`Économise -${promo['percentage']}% sur ta commande, avec le code promo ${promo['title']}.`}
    </Container>
  );
};

export default Announcement;
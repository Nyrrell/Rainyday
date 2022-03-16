import styled from "styled-components";
import media from "css-in-js-media";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;

  ${media("<=phone")} {
    font-size: 0.7rem;
  }
`;

const Announcement = ({ promo }) => {
  // TODO DATA
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
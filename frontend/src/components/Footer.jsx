import styled from "styled-components";
import { EmailOutlined, Facebook, Instagram, Phone, Room, Twitter } from "@material-ui/icons";
import { mobile } from "../responsive.js";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`

`;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props['color']};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#eee" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 40%;
`;



const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>STICKER SHOP</Logo>
        <Desc>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur cupiditate deserunt doloremque
          doloribus eum eveniet facilis illum, minus molestiae neque nobis non omnis porro possimus quas, ratione sequi
          sunt vero?</Desc>
        <SocialContainer>
          <SocialIcon color={'3B5999'}>
            <Facebook/>
          </SocialIcon>
          <SocialIcon color={'E4405F'}>
            <Instagram/>
          </SocialIcon>
          <SocialIcon color={'55ACEE'}>
            <Twitter/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Liens Utils</Title>
        <List>
          <ListItem>Accueil</ListItem>
          <ListItem>Panier</ListItem>
          <ListItem>Mon Compte</ListItem>
          <ListItem>Suivi Commande</ListItem>
          <ListItem>WishList</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Adresse :
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> Telephone :
        </ContactItem>
        <ContactItem>
          <EmailOutlined style={{marginRight:"10px"}}/> Email : contact@shop.fr
        </ContactItem>
        <Payment src={'https://i.ibb.co/Qfvn4z6/payement.png'}/>
      </Right>
    </Container>
  );
};

export default Footer;
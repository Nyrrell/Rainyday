import { EmailOutlined, Instagram, Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

import media from "css-in-js-media";
import logo from "../../assets/logo.png";

const Container = styled.footer`
  border-top: 3px solid var(--color-gray);
  background-color: var(--color-dark-alt);
`;

const Wrapper = styled.div`
  width: var(--container-size);
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  ${media("<=phone")} { flex-direction: column }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.img`
  height: 60px;
`;

const Desc = styled.p``;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
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
  cursor: pointer;
  margin-right: 1rem;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${media("<=phone")} { display: none }
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
  ${media("<=phone")} { background-color: #eee }
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <SocialContainer>
            <a href={'https://www.instagram.com/rainydayfr/'}>
              <SocialIcon color={'E4405F'}>
                <Instagram/>
              </SocialIcon>
            </a>
            <Link to={'/'}><Logo src={logo} alt="logo"/></Link>
          </SocialContainer>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur cupiditate deserunt doloremque
            doloribus eum eveniet facilis illum, minus molestiae neque nobis non omnis porro possimus quas, ratione
            sequi
            sunt vero?
          </Desc>
        </Left>
        <Center>
          <Title>Liens Utiles</Title>
          <List>
            <ListItem><Link to={'/'}>Accueil</Link></ListItem>
            <ListItem><Link to={'/cart'}>Panier</Link></ListItem>
            <ListItem><Link to={'/account'}>Mon Compte</Link></ListItem>
            <ListItem><Link to={'/term'}>Terms</Link></ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }}/> <strong>Telephone</strong> : 06 XX XX XX XX
          </ContactItem>
          <ContactItem>
            <EmailOutlined style={{ marginRight: "10px" }}/> <strong>Email</strong> : contact@rainyday.fr
          </ContactItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
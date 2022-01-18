import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import { sliderItems } from "../data.js"
import { mobile } from "../responsive.js";

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
  height: 80vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 100%;
  background-color: var(--color-dark-alt);
  color: var(--color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: ${props => props['direction'] === 'left' && '0'};
  right: ${props => props['direction'] === 'right' && '0'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props => props['slideIndex'] * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #${props => props['bg']};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80vh;
  width: 65%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;


const Description = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;


const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }

  return (
    <Container>
      <Arrow direction={'left'} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined fontSize="large"/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map(item => (
          <Slide bg={item['bg']} key={item['id']}>
            <ImgContainer>
              <Image
                src={item['img']}/>
            </ImgContainer>
            <InfoContainer>
              <Title>{item['title']}</Title>
              <Description>{item['desc']}</Description>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction={'right'} onClick={() => handleClick("right")}>
        <ArrowRightOutlined fontSize="large"/>
      </Arrow>
    </Container>
  );
};

export default Slider;
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { mobile } from "../responsive.js";

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
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.4s;
`;

const Container = styled.section`
  width: 65%;
  margin: 0 auto;
  height: 80vh;
  overflow: hidden;
  position: relative;
  border: 2px solid var(--color-gray);
  border-top: none;
  ${mobile({ display: "none" })}
  
  &:hover ${Arrow} {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: auto;
  white-space: nowrap;
  transition: transform 0.5s;
  transform: translateX(-${({ index }) => index * 100}%);
  position: relative;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  margin: 0 auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.button`
  margin: 5px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  border: 3px solid var(--color-light);
  cursor: pointer;
  background-color: ${({ active }) => active ? 'var(--color-light)' : 'transparent'};
  opacity: ${({ active }) => active ? 50 : 30}%;
`;

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 6000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <Container onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Arrow direction={'left'} onClick={() => updateIndex(activeIndex - 1)}>
        <ArrowLeftOutlined fontSize="large"/>
      </Arrow>
      <Wrapper index={activeIndex}>
        {React.Children.map(children, (child) => React.cloneElement(child))}
      </Wrapper>
      <DotContainer>
        {React.Children.map(children, (child, index) =>
          <Dot active={index === activeIndex} onClick={() => updateIndex(index)}/>
        )}
      </DotContainer>
      <Arrow direction={'right'} onClick={() => updateIndex(activeIndex + 1)}>
        <ArrowRightOutlined fontSize="large"/>
      </Arrow>
    </Container>
  );
};

export default Carousel;

import { Add, Remove } from "@mui/icons-material";
import { useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.input`
  width: ${({ size }) => size === 'large' ? '40px' : '30px'};
  height: ${({ size }) => size === 'large' ? '40px' : '30px'};
  border-radius: 10px;
  font-weight: 800;
  font-size: 1rem;
  border: 2px solid var(--color-yellow);
  background: transparent;
  color: inherit;
  margin: 0 5px;
  text-align: center;
`;

const AmountProduct = ({ amount, size = 'large', test }) => {
  const [quantity, setQuantity] = useState(amount);
  console.log(quantity)
  console.log(amount)
  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
      test(quantity)
    } else {
      setQuantity(quantity + 1);
      test(quantity)
    }
    console.log(quantity)
    console.log(amount)
  };

  return (
    <Container>
      <Remove cursor={"pointer"} fontSize={size} onClick={() => handleQuantity('dec')}/>
      <Amount type={'numeric'} size={size} value={quantity} onChange={e => !isNaN(e.target.value) && test(quantity)}/>
      <Add cursor={"pointer"} fontSize={size} onClick={() => handleQuantity('inc')}/>
    </Container>
  );
};

export default AmountProduct;
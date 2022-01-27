import { Add, Remove } from "@mui/icons-material";
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

const AmountProduct = ({ quantity, size = 'large', setQuantity }) => {

  const handleQuantity = async (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      await setQuantity(quantity + 1);
    }
  };

  const handleChange = (e) => {
    let { value } = e.target;
    if (isNaN(value) || value <= 0) return setQuantity(1);
    setQuantity(Number(value))
  }

  return (
    <Container>
      <Remove cursor={"pointer"} fontSize={size} onClick={() => handleQuantity('dec')}/>
      <Amount type={'numeric'} size={size} value={quantity} onChange={handleChange}/>
      <Add cursor={"pointer"} fontSize={size} onClick={() => handleQuantity('inc')}/>
    </Container>
  );
};

export default AmountProduct;
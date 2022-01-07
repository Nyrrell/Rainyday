import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const Chart = ({ title, data, dataKey, grid }) => {

  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer widht={'100%'} aspect={4}>
        <LineChart data={data}>
          <XAxis dataKey={'name'} stroke={'#5550BD'}/>
          <YAxis stroke={'#5550BD'}/>
          <Line type={"monotone"} dataKey={dataKey} stroke={'#5550BD'}/>
          <Tooltip/>
          {grid && <CartesianGrid stroke={'#e0dfdf'} strokeDasharray={'5 5'}/>}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
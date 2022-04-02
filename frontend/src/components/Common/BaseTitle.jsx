import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  width: fit-content;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
  rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
`;

const BaseTitle = ({ className, children, ...props }) => (
  <StyledTitle className={className} {...props}>
    {children}
  </StyledTitle>
);

export default BaseTitle;
import { Alert } from "@mui/material";
import styled, { css } from "styled-components";

const AlertCustom = styled(Alert)`
  ${props => props.light && css`
    color: var(--color-light);
  `}
  margin-bottom: 1rem;  
`;

const Feedback = ({ className, severity, light = false, children, ...props }) => {
  return (
    <AlertCustom className={className} variant={"outlined"} severity={severity} light={+light} {...props}>
      {children}
    </AlertCustom>
  );
};

export default Feedback;
import styled from "styled-components";

const Children = styled.div`
  border: 2px solid var(--color-gray);
  background-color: var(--color-dark-alt);
`;

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Children>
          {children}
        </Children>
      )}
    </div>
  );
};

export default TabPanel;
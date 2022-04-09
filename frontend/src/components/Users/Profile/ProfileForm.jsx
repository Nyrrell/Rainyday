import styled from "styled-components";
import Feedback from "../../Common/Feedback.jsx";

const Form = styled.form`
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 20px;
`;

const ProfileForm = ({ error, children }) => {
  return (
    <Form>
      {error && <Feedback severity={"error"} light>Une erreur est survenue !</Feedback>}
      {children}
    </Form>
  );
};

export default ProfileForm;
import styled from "styled-components";
import { useState } from "react";

import ImagePopover from "./ImagePopover.jsx";

const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    cursor: zoom-in;
  }
`;

const ImageBadge = ({ src, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Image src={process.env.REACT_APP_BACKEND_URL + src} onClick={handleClick} className={className}/>
      <ImagePopover open={open} element={anchorEl} close={handleClose}/>
    </>
  );
};

export default ImageBadge;
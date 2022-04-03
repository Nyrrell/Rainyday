import { useEffect, useState } from "react";
import Popover from '@mui/material/Popover';
import styled from "styled-components";

const Image = styled.img`
  width: 50vh;
  height: 50vh;
  object-fit: cover;
`;

const ImagePopover = ({ open, close, element}) => {
  const [src, setSrc] = useState();

  useEffect(() => {
    element?.['currentSrc'] && setSrc(element['currentSrc'])
  }, [element])

  return (
    <Popover
      open={open}
      anchorEl={element}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      onClose={close}
    >
      <Image src={src} alt=""/>
    </Popover>
  );
}

export default ImagePopover;
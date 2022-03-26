import { Box, Paper, Popper, Typography } from "@mui/material";
import { memo, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(Box)`
  align-items: center;
  line-height: 24px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

const CellDiv = styled(Box)`
  height: 100%;
  width: ${props => props.width}px;
  display: block;
  position: absolute;
  top: 0;
`;

const CellValue = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const isOverflown = (element) => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = useRef(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  return (
    <Wrapper
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      width={width}
    >
      <CellDiv ref={cellDiv} width={width}/>
      <CellValue ref={cellValue}>
        {value}
      </CellValue>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Wrapper>
  );
});

export const DataEllipsis = (params) => {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth}/>
  );
}
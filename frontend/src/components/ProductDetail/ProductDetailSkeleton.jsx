import { Skeleton } from "@mui/material";
import styled from "styled-components";
import media from "css-in-js-media";

const ImgContainerSkeleton = styled.div`
  flex: 1;
  max-height: 400px;
  max-width: 400px;
`;

const InfoContainerSkeleton = styled.div`
  flex: 1;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  ${media("<=phone")} {
    padding: 10px
  }
`;

const SkeletonStyle = styled(Skeleton)`
  background: var(--color-dark-alt);
`;

const ProductDetailSkeleton = () => {
  return (
    <>
      <ImgContainerSkeleton>
        <SkeletonStyle variant="rectangular" width={400} height={400}/>
      </ImgContainerSkeleton>
      <InfoContainerSkeleton>
        <SkeletonStyle height={50}/>
        <SkeletonStyle height={200}/>
        <SkeletonStyle width={200}/>
        <SkeletonStyle width={200} style={{marginTop: "6rem"}}/>
      </InfoContainerSkeleton>
    </>
  );
};

export default ProductDetailSkeleton;
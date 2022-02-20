import styled from "styled-components";
import ProductForm from "../../components/Admin/Form/ProductForm.jsx";

const PageTitle = styled.h1``;

const ProductNew = () => {
  return (
    <>
      <PageTitle>Nouvel Article</PageTitle>
      <ProductForm type={'enregister'}>
      </ProductForm>
    </>
  );
};

export default ProductNew;
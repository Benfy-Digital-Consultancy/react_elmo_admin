import React from "react";
import { withRouter } from "react-router";
import ProductListDetail from "components/clientFlow/ProductFlow/ProductListDetail";

const ProductList = () => {
  return <ProductListDetail />;
};

export default withRouter(ProductList);

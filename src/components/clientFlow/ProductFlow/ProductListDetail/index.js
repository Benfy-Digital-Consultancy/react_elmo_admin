import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { getSchemeListFromProduct } from "redux/action/clientFlow/BuyInvestAct";
import "./style.scss";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import Pagination from "components/Common/Pagination/Pagination";
import ProductCard from "../ProductCard";
import { endpoints } from "service/helpers/config";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { PageLoader } from "components/Common/PageLoader";

const ProductListDetail = (props) => {
  const history = useHistory();
  const { productName, productId } = useParams();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(endpoints.auth.pageLimit);
  const { getSchemeListFromProductApi } = props;

  const breadCrumbsList = [
    {
      redirection: () => history.goBack(),
      label: "Dashboard",
    },
    {
      label: productName,
    },
  ];

  const getSchemeListFromProductApiFunc = useCallback(() => {
    if (productId && productName) {
      setIsLoading(true);
      let payload = {
        ProductId: productId,
        LanguageId: 2,
        SchemeBaseName: productName,
      };
      getSchemeListFromProductApi(payload)
        .then(({ DataObject }) => {
          DataObject && setProductList(DataObject);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [getSchemeListFromProductApi, productName, productId]);

  useEffect(() => {
    getSchemeListFromProductApiFunc();
  }, [getSchemeListFromProductApiFunc]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="product-list">
      <div className="p-3">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
      </div>
      <div className="product-list-details">
        {productList.length !== 0 ? (
          productList.map(
            (list, index) =>
              page * pageCount >= index + 1 &&
              (page - 1) * pageCount < index + 1 && (
                <React.Fragment key={index}>
                  <ProductCard
                    productDetails={list}
                    productName={productName}
                    productId={productId}
                  />
                </React.Fragment>
              )
          )
        ) : (
          <EmptyRecord />
        )}
        {productList && productList?.length > 0 && (
          <Pagination
            pageNumber={page}
            pageChange={setPage}
            handlePageSize={(limit) => {
              setPageCount(limit);
              setPage(1);
            }}
            totalPages={productList?.length / pageCount}
            pageSize={pageCount}
          />
        )}
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getSchemeListFromProductApi: getSchemeListFromProduct },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ProductListDetail));

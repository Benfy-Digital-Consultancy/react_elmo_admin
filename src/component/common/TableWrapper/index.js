import React from "react";
import PropTypes from "prop-types";
import "./table.scss";
import Pagination from "component/common/Pagination/Pagination";

export default function TableWrapper(props) {
  let {
    headerDetails,
    children,
    className = "",
    handlePageSize,
    pageNumber,
    pageSize,
    pageChange,
    totalPages,
  } = props;

  return (
    <>
      <div className={`maintable-content mt-4 ${className}`}>
        <table className={`table`}>
          <thead>
            <tr>
              {headerDetails?.map(({ label }, index) => (
                <th key={index}>
                  <div className={"d-flex "} style={{
                    paddingLeft:(label == 'S.No' || label === 'Action') ? 20 : 0
                  }}>
                    {label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody id="tableBody">
            {children}
          </tbody>
        </table>
      </div>
      <Pagination
        pageNumber={pageNumber}
        pageChange={(e) => {
          pageChange(e);
          document.getElementById("tableBody").scrollIntoView();
        }}
        handlePageSize={handlePageSize}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}

TableWrapper.propTypes = {
  placeHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  isEmpty: PropTypes.bool,
  headerDetails: PropTypes.array.isRequired,
  pageMeta: PropTypes.object,
};

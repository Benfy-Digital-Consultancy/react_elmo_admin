import React from "react";
import "./Pagination.scss";
import ReactPaginate from "react-paginate";
import { useLang } from "hooks/useLang";

const Pagination = (props) => {
  let {
    totalPages,
    pageChange,
    handlePageSize,
    pageNumber,
    pageSize,
    pageOption = false,
  } = props;

  const { Labels } = useLang();
  const options = [
    pageOption === true && { value: 1, label: "1" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
  ];

  const handlePageChange = (page) => {
    pageChange(page);
  };

  return (
    totalPages > 0 && (
      <div className="mt-3 px-3">
        <div className="div-pagination pt-2">
          <div className="show-product">
            <span>{Labels.show}</span>
            <select
              className="cursor-pointer"
              aria-label="Default select example"
              onChange={(e) => handlePageSize(e.target.value)}
              value={pageSize}
            >
              {options?.map((option, index) => (
                <option value={option?.value} key={index}>
                  {option?.label}
                </option>
              ))}
            </select>
            <span>{Labels.entries}</span>
          </div>
          <div className="div-pagination ml-auto">
            <ReactPaginate
              disableInitialCallback={true}
              previousLabel={Labels.previous}
              nextLabel={Labels.next}
              breakLabel={<span>...</span>}
              breakClassName="me-2 my-auto"
              pageCount={Math.ceil(totalPages)}
              pageRangeDisplayed={1}
              onPageChange={(e) => handlePageChange(e.selected + 1)}
              containerClassName="pagination custom-pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              disabledClassName={"disabled"}
              forcePage={pageNumber - 1}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Pagination;

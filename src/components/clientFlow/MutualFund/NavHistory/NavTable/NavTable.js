import React, { useEffect, useState } from "react";
import "../../NavHistory/NavHistory.scss";
import TableWrapper from "../../../../Common/TableWrapper";
import { NavTableHeader } from "../../../../../service/helpers/Constants";
import { date } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

const NavTable = ({ currentNavList }) => {
  const { Labels } = useLang();
  const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    setPageLimit(endpoints.auth.pageLimit);
  }, [currentNavList]);

  return (
    <div className="nav-history-parent">
      <TableWrapper
        className="table-block"
        headerDetails={NavTableHeader}
        handlePageSize={(pageSize) => {
          setPage(1);
          setPageLimit(pageSize);
        }}
        pageNumber={page}
        pageSize={pageLimit}
        pageChange={setPage}
        totalPages={currentNavList.length / pageLimit}
      >
        {currentNavList?.length > 0 ? (
          currentNavList.map((item, index) => {
            return (
              page * pageLimit >= index + 1 &&
              (page - 1) * pageLimit < index + 1 && (
                <React.Fragment key={index}>
                  <tr>
                    <td align="center">{date(item.NAVDate)}</td>
                    <td align="center">{item.NAV}</td>
                  </tr>
                  <tr className="empty-height" height="12" />
                </React.Fragment>
              )
            );
          })
        ) : (
          <td colSpan={9} className="text-center">
            {Labels.noData}
          </td>
        )}
      </TableWrapper>
    </div>
  );
};

export default NavTable;

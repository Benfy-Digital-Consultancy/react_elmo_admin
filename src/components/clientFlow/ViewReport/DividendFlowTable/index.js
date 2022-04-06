import React, { useState } from 'react'
import TableWrapper from "components/Common/TableWrapper";
import { DividendHeader } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

const DividendTable = ({ dividendData }) => {
    const { Labels } = useLang();
    const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);
    const [page, setPage] = useState(1);

    return (
        <div className="reportId-div">
            <TableWrapper
                className="table-block"
                headerDetails={DividendHeader}
                handlePageSize={(pageSize) => {
                    setPage(1);
                    setPageLimit(pageSize);
                }}
                pageNumber={page}
                pageSize={pageLimit}
                pageChange={setPage}
                totalPages={dividendData.length / pageLimit}
            >
                {dividendData?.length > 0 ? (
                    dividendData.map((item, index) => {
                        return (
                            page * pageLimit >= index + 1 &&
                            (page - 1) * pageLimit < index + 1 && (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td align="center">{item.Category}</td>
                                        <td align="center">{item.TotalDividend}</td>
                                        <td align="center">{item.DividendPayout}</td>
                                        <td align="center">{item.DividendReInvest}</td>
                                    </tr>
                                    <tr className="empty-height" height="12" />
                                </React.Fragment>
                            )
                        );
                    })
                ) : (
                    <td colSpan={4} className="text-center">
                        {Labels.noData}
                    </td>
                )}
            </TableWrapper>
        </div>
    )
}


export default DividendTable;
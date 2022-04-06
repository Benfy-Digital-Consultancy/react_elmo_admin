import React, { useState, } from 'react'
import TableWrapper from "components/Common/TableWrapper";
import { CashFlowHeader } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

const CashFlowTable = (props) => {
    const { Labels } = useLang();
    const { cashFlowData } = props;
    const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);
    const [page, setPage] = useState(1);

    return (
        <div className="reportId-div">
            <TableWrapper
                className="table-block"
                headerDetails={CashFlowHeader}
                handlePageSize={(pageSize) => {
                    setPage(1);
                    setPageLimit(pageSize);
                }}
                pageNumber={page}
                pageSize={pageLimit}
                pageChange={setPage}
                totalPages={cashFlowData.length / pageLimit}
            >
                {cashFlowData?.length > 0 ? (
                    cashFlowData.map((item, index) => {
                        return (
                            page * pageLimit >= index + 1 &&
                            (page - 1) * pageLimit < index + 1 && (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td align="center">{item.Year}</td>
                                        <td align="center">{item.Month}</td>
                                        <td align="center">{item.CashInvested}</td>
                                        <td align="center">{item.InvestmentRedeemed}</td>
                                        <td align="center">{item.Net}</td>
                                        <td align="center">{item.CumulativeBalance}</td>
                                        <td align="center">{item.DividendRecd}</td>
                                    </tr>
                                    <tr className="empty-height" height="12" />
                                </React.Fragment>
                            )
                        );
                    })
                ) : (
                    <td colSpan={7} className="text-center">
                        {Labels.noData}
                    </td>
                )}
            </TableWrapper>
        </div>
    )
}


export default CashFlowTable;
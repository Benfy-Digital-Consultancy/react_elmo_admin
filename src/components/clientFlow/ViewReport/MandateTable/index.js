import React, { useState, useCallback, useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import TableWrapper from "components/Common/TableWrapper";
import { getMandateReportAction } from "redux/action/clientFlow/ReportAct";
import { MandateHeader } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { date } from "service/helperFunctions";
import { PageLoader } from 'components/Common/PageLoader';
import { useLang } from "hooks/useLang";
import excel from "assets/images/excel.svg";

const MandateTable = (props) => {
    const { Labels } = useLang();
    const { getMandateReportActionApi } = props;
    const [mandateList, setMandateList] = useState([])
    const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [xlxsMandateData, setXlxsMandateData] = useState([])

    // mandate table api
    const mandateTableData = useCallback(() => {
        setIsLoading(true)
        getMandateReportActionApi()
            .then((response) => {
                setIsLoading(false)
                setMandateList(response.mandateList)
                setXlxsMandateData(response.Path)
            })
    }, [getMandateReportActionApi])

    const onClickExcel = (data) => {
        var a = window.document.createElement("a");
        a.href = data
        a.download = data
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    useEffect(() => {
        mandateTableData()
    }, [mandateTableData])


    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="reportId-div">
            <div className="excel-pdf">
                <img src={excel} alt="excel" className="excel-img" onClick={() => onClickExcel(endpoints?.auth?.xlsxHeader + xlxsMandateData)} />
            </div>
            <div>
                <TableWrapper
                    className="table-block"
                    headerDetails={MandateHeader}
                    handlePageSize={(pageSize) => {
                        setPage(1);
                        setPageLimit(pageSize);
                    }}
                    pageNumber={page}
                    pageSize={pageLimit}
                    pageChange={setPage}
                    totalPages={mandateList.length / pageLimit}
                >
                    {mandateList?.length > 0 ? (
                        mandateList.map((item, index) => {
                            return (
                                page * pageLimit >= index + 1 &&
                                (page - 1) * pageLimit < index + 1 && (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td align="center">{item.Mandate_Code}</td>
                                            <td align="center">{item.Client_Code}</td>
                                            <td align="center">{item.ClientName}</td>
                                            <td align="center">{item.Status}</td>
                                            <td align="center">{item.Remarks}</td>
                                            <td align="center">{item.RMName}</td>
                                            <td align="center">{item.SubBroker}</td>
                                            <td align="center">{date(item.MandateCreationDate)}</td>
                                            <td align="center">{item.Amount}</td>
                                            <td align="center">{item.MandateType}</td>
                                            <td align="center">{item.ApproveDate}</td>
                                        </tr>
                                        <tr className="empty-height" height="12" />
                                    </React.Fragment>
                                )
                            );
                        })
                    ) : (
                        <td colSpan={11} className="text-center">
                            {Labels.noData}
                        </td>
                    )}
                </TableWrapper>
            </div>
        </div>
    )
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getMandateReportActionApi: getMandateReportAction,
        },
        dispatch
    );
};


export default connect(
    null,
    mapDispatchToProps
)(withRouter(MandateTable));
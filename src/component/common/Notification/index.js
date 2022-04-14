import React, { useEffect, useState } from 'react'
import './styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { NotificationHeader } from "../../../service/helpers/Constants";
import { request } from 'service';
import endponts from 'service/endponts';
import moment from 'moment';
import NoData from 'component/NoData';


const Notification = (props) => {


    const [totalPages, setTotalPages] = useState(1)
    const [tableData, setTableData] = useState([])
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(10)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        getNotification(1,10)
    }, [])

    const calculateSNo = (index) => {
        return (parseInt(pageLimit) * (page-1)) + (index + 1)
    }

    const changeData=(date)=>{
        let data = moment(date).format('DD-MMM-YYYY hh:mm a');
        return data
    }

    const getNotification=(page,pageLimit)=>{
        request({
            url:endponts.Endpoints.getNotification+"?page="+page+"&limit="+pageLimit,
            method:endponts.APIMethods.GET
        }).then(res=>{
            setTableData(res?.data?.data?.list);
            setTotalPages(res?.data?.data?.pageMeta?.totalPages);
            setTotalCount(res?.data?.data?.pageMeta?.total);
        })
    }

    return (
        <>
            <div className="notiy-title font-bold-28">Notification</div>

            <div>
                <TableWrapper
                    className="table-block"
                    headerDetails={NotificationHeader}
                    handlePageSize={(pageSize) => {
                        setPageLimit(pageSize);
                        if (pageSize > totalCount) {
                            setPage(1);
                            getNotification(1,pageSize)
                        } else {
                            getNotification(page,pageSize);
                        }
                    }}
                    pageNumber={page}
                    pageSize={pageLimit}
                    pageChange={(e) => {
                        setPage(e);
                        console.log(e);
                        getNotification(e,pageLimit)
                    }}
                    totalPages={totalPages}
                >
                    {tableData?.length > 0 ? (
                        tableData?.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="table_row">
                                        <td align="center">{calculateSNo(index)}</td>
                                        <td align="left" style={{
                                            width:200
                                        }}>{changeData(item.createdAt)}</td>
                                        <td align="left" style={{
                                            width:200
                                        }}>{item.notificationKey}</td>
                                        <td align="left">{item.notificationContent}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    ) : (
                        <td colSpan={9} className="text-center">
                           <NoData/>
                        </td>
                    )}
                </TableWrapper>
            </div>

        </>
    )
}
export default Notification
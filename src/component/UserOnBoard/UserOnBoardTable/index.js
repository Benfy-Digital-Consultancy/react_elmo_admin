import React, { useState, useEffect } from "react";
import '../styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { UserOnBoardHeader } from "../../../service/helpers/Constants";
import 'antd/dist/antd.css';
import { Switch, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import NoData from "component/NoData";



function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const UserOnBoardTable = (props) => {
    const [pageLimit, setPageLimit] = useState(props.pageLimit);
    const [page, setPage] = useState(props.page);
    const [tableData, setTableData] = useState([])
    const [pageMeta, setPageMeta] = useState({})


    useEffect(() => {
        setTableData(props?.lists);
        setPageMeta(props?.pageMeta);
        setPage(props.page)
        setPageLimit(props.pageLimit)
    }, [props]);

   
    const calculateSNo = (index) => {
        return (parseInt(pageLimit) * (page-1)) + (index + 1)
    }
    return (
        <>
            <div>
                <TableWrapper
                    className="table-block"
                    headerDetails={UserOnBoardHeader}
                    handlePageSize={(pageSize) => {
                        setPageLimit(pageSize);
                        if (pageSize > pageMeta.totalPages) {
                            setPage(1);
                            props.setPageLimit(1, pageSize)
                        } else {
                            props.setPageLimit(page, pageSize)
                        }
                    }}
                    pageNumber={page}
                    pageSize={pageLimit}
                    pageChange={(e) => {
                        setPage(e);
                        props.onChangePage(e, pageLimit)
                    }}
                    totalPages={pageMeta.totalPages}
                >
                    {tableData?.length > 0 ? (
                        tableData?.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="table_row">
                                        <td align="center">{calculateSNo(index)}</td>
                                        <td align="left">{item.firstName + " " + item.lastName}</td>
                                        <td align="left">{item.email}</td>
                                        <td align="left">{item.countryCode + " " + item.mobileNumber}</td>
                                        <td align="left">
                                            <div className="flexRow">
                                                <Switch
                                                    checked={item.userStatus == 1}
                                                    onChange={(e) => props.onSwitchChange(e, item)} />
                                                    <p className={item.userStatus === 1 ? `available`: `inactive`}>{item.userStatus === 1  ? `Available` : `InActive`}</p>
                                            </div>

                                        </td>
                                        <td align="center">
                                            <Tooltip title={<div>
                                                <div onClick={() => props.onClickEdit(item)} className="mt-1"><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                                                <div onClick={() => props.onClickDelete(item)} className="mt-3 mb-2"><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
                                            </div>} placement="bottomRight">
                                                <label className="tooletip_lable">...</label>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
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
};
export default UserOnBoardTable;

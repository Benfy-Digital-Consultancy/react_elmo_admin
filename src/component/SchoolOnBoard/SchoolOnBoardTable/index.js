import React, { useState, useEffect } from "react";
import '../styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { SchoolOnBoardHeader } from "../../../service/helpers/Constants";
import 'antd/dist/antd.css';
import { Switch, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import school_logo from 'assets/images/school.png';
import { Link } from "react-router-dom";
import profile_placeholder from "assets/images/profile_placeholder.png";
import { request } from "service";
import NoData from "component/NoData";




function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const SchoolOnBoardTable = (props) => {
    const [pageLimit, setPageLimit] = useState(props.pageLimit);
    const [page, setPage] = useState(props.page);
    const [tableData, setTableData] = useState([])
    const [pageMeta, setPageMeta] = useState({});

    const [isValid, setIsValid] = useState(true)

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
                    headerDetails={SchoolOnBoardHeader}
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
                        tableData.map((item, index) => {
                            return (

                                <React.Fragment key={index}>
                                    <tr className="table_row">
                                        <td align="center" style={{
                                            paddingTop: 30
                                        }}>{calculateSNo(index)}</td>
                                        <td align="left" style={{
                                            paddingTop: 30
                                        }}>{item.schoolId}</td>
                                        <td align="center">
                                            <img
                                                className="profile_pic"
                                                src={item.profilePicture} />
                                        </td>
                                        <td align="left" style={{
                                            paddingTop: 30
                                        }}>{item.schoolName}</td>
                                        <td align="left" style={{
                                            paddingTop: 30
                                        }}>{item.schoolBoard}</td>
                                        <td align="left" style={{
                                            paddingTop: 30
                                        }}>{item.email}</td>
                                        <td align="left">
                                            <div className="flexRow" style={{
                                                paddingTop: 10
                                            }}>
                                                <Switch
                                                    checked={item.userStatus == 1}
                                                    onChange={(e) => props.onSwitchChange(e, item)} />
                                                <p className={item.userStatus === 1 ? `available` : `inactive`}>{item.userStatus === 1 ? `Available` : `InActive`}</p>
                                            </div>
                                        </td>
                                        <td align="center" style={{
                                            paddingTop: 25
                                        }}>
                                            <Tooltip title={<div>
                                                <div onClick={() => props.onClickView(item)} className="mt-1"><span><AiOutlineEye color="#8F9295" /></span><span className="tooletip_icon">View</span></div>
                                                <div onClick={() => props.onClickEdit(item)} className="mt-3"><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                                                <div onClick={() => props.onClickDelete(item)} className="mt-3 mb-2"><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
                                            </div>} placement="bottomRight">
                                                <label className="tooletip_lable">...</label>
                                            </Tooltip>
                                        </td>
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
};
export default SchoolOnBoardTable;

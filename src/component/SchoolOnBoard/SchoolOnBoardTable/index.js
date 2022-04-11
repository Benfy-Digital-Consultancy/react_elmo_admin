import React, { useState, useEffect } from "react";
import '../styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { SchoolOnBoardHeader } from "../../../service/helpers/Constants";
import 'antd/dist/antd.css';
import { Switch, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineEye,AiOutlineDelete } from "react-icons/ai";
import school_logo from 'assets/images/school.png';
import { Link } from "react-router-dom";




function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const SchoolOnBoardTable = (props) => {
    const [pageLimit, setPageLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
          
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
            
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
           
        },
        {
            sno: "1",
            school_id: "KHS32890",
            school_logo: <img src={school_logo} alt="school_logo" />,
            school_name: "SBOA Matriculation Higher secondary School",
            board: "Matriculation",
            email_id: "SBOA@info.in",
            status: <Switch defaultChecked onChange={onChange} />,
          
        },

    ])

    useEffect(() => {
        setPage(1);
        setPageLimit(10);
    }, [tableData]);
    return (
        <>
            <div>
                <TableWrapper
                    className="table-block"
                    headerDetails={SchoolOnBoardHeader}
                    handlePageSize={(pageSize) => {
                        setPage(1);
                        setPageLimit(pageSize);
                    }}
                    pageNumber={page}
                    pageSize={pageLimit}
                    pageChange={setPage}
                    totalPages={tableData.length / pageLimit}
                >
                    {tableData?.length > 0 ? (
                        tableData.map((item, index) => {
                            return (
                                page * pageLimit >= index + 1 &&
                                (page - 1) * pageLimit < index + 1 && (
                                    <React.Fragment key={index}>
                                        <tr className="table_row">
                                            <td align="center">{item.sno}</td>
                                            <td align="center">{item.school_id}</td>
                                            <td align="center">{item.school_logo}</td>
                                            <td align="center">{item.school_name}</td>
                                            <td align="center">{item.board}</td>
                                            <td align="center">{item.email_id}</td>
                                            <td align="center">{item.status}</td>
                                            <td align="center">
                                                <Tooltip title={<div>
                                                    <div onClick={props.onClickView} className="mt-1"><span><AiOutlineEye color="#8F9295" /></span><span className="tooletip_icon">View</span></div>
                                                    <div onClick={props.onClickEdit} className="mt-3"><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                                                    <div onClick={props.onClickDelete} className="mt-3 mb-2"><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
                                                </div>} placement="bottomRight">
                                                    <label className="tooletip_lable">...</label>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            );
                        })
                    ) : (
                        <td colSpan={9} className="text-center">
                            noData
                        </td>
                    )}
                </TableWrapper>
            </div>
        </>
    )
};
export default SchoolOnBoardTable;

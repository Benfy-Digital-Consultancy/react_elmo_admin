import React, { useState, useEffect } from "react";
import '../styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { UserOnBoardHeader } from "../../../service/helpers/Constants";
import 'antd/dist/antd.css';
import { Switch, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";



function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const UserOnBoardTable = (props) => {
    const [pageLimit, setPageLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([
        {
            sno: "1",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "2",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "3",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "4",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "5",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "6",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "7",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "8",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "9",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch defaultChecked onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "10",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        },
        {
            sno: "11",
            school_id: "Ashwin Raj",
            school_logo: "AshwinRaj@gmail.com",
            school_name: "+91 9038201928",
            board: <Switch onChange={onChange} />,
            email_id: <Tooltip title={<div>
                <div><span><AiOutlineEdit color="#8F9295" /></span><span className="tooletip_icon">Edit</span></div>
                <div><span><AiOutlineDelete color="#8F9295" /></span><span className="tooletip_icon">Delete</span></div>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
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
                    headerDetails={UserOnBoardHeader}
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
export default UserOnBoardTable;

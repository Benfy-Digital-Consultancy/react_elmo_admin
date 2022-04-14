import React, { useState, useEffect } from "react";
import './styles.scss'
import { AiOutlineSearch } from "react-icons/ai";
import NormalButton from "component/common/NormalButton/NormalButton";
// import SelectFilter from "component/common/Select";
import 'antd/dist/antd.css';
import { Link, useHistory } from "react-router-dom";
import SchoolOnBoardTable from "./SchoolOnBoardTable";
import { request } from "service";
import endponts from "service/endponts";
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Toast } from "service/toast";

const { Option } = Select;




function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const SchoolOnBoardComp = (props) => {
    const [searchBox, setsearchBox] = useState("");
    const [lists, setLists] = useState([]);
    const [pageMeta, setPageMeta] = useState({});
    const [page, setPage] = useState(1);
    const [board, setBoard] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [boardList, setBoardList] = useState([]);

    const history = useHistory();


    useEffect(() => {
        getSchoolLists(page, pageLimit, '', '', true);
        getBoardingList()
    }, []);

    const getSchoolLists = (page, pageLimit, board, search, showLoader) => {
        setPage(page);
        setPageLimit(pageLimit);
        setBoard(board);

        let params = "?page=" + page + "&limit=" + pageLimit

        if (board && board != "All") {
            params += "&boardFilter=" + board
        }

        if (search) {
            params += "&searchValue=" + search
        }

        console.log(showLoader);
        request({
            url: endponts.Endpoints.schoolList + params,
            method: endponts.APIMethods.GET,
            isLoader: showLoader
        }).then(res => {
            setLists(res.data.data.list);
            setPage(page);
            setPageMeta(res.data.data.pageMeta);
        })
    }

    const updateSchoolStatus = (e, item) => {
        request({
            url: endponts.Endpoints.updateSchoolStatus,
            method: endponts.APIMethods.PUT,
            data: {
                "userStatus": e == "delete" ? 3 : (e ? 1 : 2),
                "uniqueUserID": item.uniqueUserID
            }
        }).then(res => {
            Toast({ type: 'success', message: res.data.message });
            getSchoolLists(page, pageLimit, board, searchBox, true)
        })
    }

    const onClickEdit = (item, status) => {
        history.push({
            pathname: "/admin/create-school-user",
            state: { status: status, item: item }
        });
    }

    const onClickView = (item) => {
        history.push({
            pathname: "/admin/view-school-user",
            state: { item: item }
        });
    }

    const getBoardingList = () => {
        request({
            url: endponts.Endpoints.schoolBoards,
            method: endponts.APIMethods.GET,
            isLoader: true
        }).then(res => {
            setBoardList(res?.data?.data)
        })
    }


    return (
        <>
            <div className="onboard_title">
                <div className=" font-bold-28">School Onboard</div>
                <NormalButton
                    onClick={() => onClickEdit({}, false)}
                    dasboardButton className="font-regular-16" label="Add New School" />
            </div>
            <div className="search_filter mt-3">
                <div className="searchBox">
                    <input
                        className="searchInput"
                        value={searchBox}
                        onChange={(e) => {
                            setsearchBox(e.target.value)
                            if (e.target.value.length > 2) {
                                getSchoolLists(1, 10, board, e.target.value, false)
                            }
                            
                            if(e.target.value.length == 0) {
                                getSchoolLists(1, 10, board, '', false)
                            }
                        }}
                        placeholder={"Search School ID, School Name"}
                    />
                    <div className="mr-2" style={{
                        marginTop: '7px'
                    }}>
                        <AiOutlineSearch size={20} color="#C7C7C7" />
                    </div>
                </div>
                <div className="gender_filter">
                    <label className="mr-3 font-bold-14">Board</label>
                    <div className='select_dropdown'>
                        <Select
                            onChange={(e) => getSchoolLists(1, 10, e, searchBox, true)}
                            placeholder={"Select"}
                            defaultValue={"All"} style={{ width: 120 }} >
                            <Option value={"All"}>{"All"}</Option>
                            {boardList.map(item => {
                                return (
                                    <Option value={item.schoolBoardName}>{item.schoolBoardName}</Option>
                                )
                            })}
                        </Select>
                    </div>
                </div>
            </div>
            <SchoolOnBoardTable
                lists={lists}
                pageMeta={pageMeta}
                page={page}
                pageLimit={pageLimit}
                onSwitchChange={(e, item) => updateSchoolStatus(e, item)}
                setPageLimit={(page, limit) => getSchoolLists(page, limit, board, searchBox, true)}
                onClickDelete={(item) => updateSchoolStatus("delete", item)}
                onChangePage={(page, limit) => getSchoolLists(page, limit, board, searchBox, true)}
                onClickEdit={(item) => onClickEdit(item, true)}
                onClickView={(item) => onClickView(item)}
            />
        </>
    )
};
export default SchoolOnBoardComp;

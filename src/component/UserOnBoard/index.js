import React, { useState, useEffect } from "react";
import './styles.scss'
import { AiOutlineSearch } from "react-icons/ai";
import NormalButton from "component/common/NormalButton/NormalButton";
import SelectFilter from "component/common/Select";
import 'antd/dist/antd.css';
import UserOnBoardTable from "./UserOnBoardTable";
import { Link } from "react-router-dom";




function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const UserOnBoardComp = (props) => {
    const [searchBox, setsearchBox] = useState("");

    return (
        <>
            <div className="onboard_title">
                <div className=" font-bold-28">User Onboard</div>
                <Link to="/admin/create-user">
                    <NormalButton dasboardButton className="font-regular-16" label="User Onboard" />
                </Link>
            </div>
            <div className="search_filter mt-3">
                <div className="searchBox">
                    <input
                        className="searchInput"
                        value={searchBox}
                        onChange={(e) => setsearchBox(e.target.value)}
                        placeholder={"Search User ID or User Name"}
                    />
                    <div className="mr-2" style={{
                        marginTop:'7px'
                    }}>
                    <AiOutlineSearch size={20} color="#C7C7C7" />
                    </div>
                </div>
                <div className="gender_filter">
                    <label className="mr-3 font-bold-14">Gender</label>
                    <SelectFilter
                        optionOne="All"
                        optionTwo="Male"
                        optionThree="Female"
                    />
                </div>
            </div>
            <UserOnBoardTable 
             onClickDelete={()=>console.log("delete")}
             onClickEdit={()=>console.log("edit")}
            />
        </>
    )
};
export default UserOnBoardComp;

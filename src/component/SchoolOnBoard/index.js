import React, { useState, useEffect } from "react";
import './styles.scss'
import { AiOutlineSearch } from "react-icons/ai";
import NormalButton from "component/common/NormalButton/NormalButton";
import SelectFilter from "component/common/Select";
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import SchoolOnBoardTable from "./SchoolOnBoardTable";




function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const SchoolOnBoardComp = (props) => {
    const [searchBox, setsearchBox] = useState("");

    return (
        <>
            <div className="onboard_title">
                <div className=" font-bold-28">School Onboard</div>
                <Link to="/admin/create-school-user">
                    <NormalButton dasboardButton className="font-regular-16" label="Add New School" />
                </Link>
            </div>
            <div className="search_filter mt-3">
                <div className="searchBox">
                    <input
                        className="searchInput"
                        value={searchBox}
                        onChange={(e) => setsearchBox(e.target.value)}
                        placeholder={"Search"}
                    />
                    {/* <AiOutlineSearch size={25} color="#C7C7C7" /> */}
                </div>
                <div className="gender_filter">
                    <label className="mr-3 font-bold-14">Board</label>
                    <SelectFilter
                        optionOne="All"
                        optionTwo="Matric"
                        optionThree="CBSC"
                    />
                </div>
            </div>
            <SchoolOnBoardTable />
        </>
    )
};
export default SchoolOnBoardComp;

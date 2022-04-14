import React, { useState, useEffect } from "react";
import './styles.scss'
import { AiOutlineSearch } from "react-icons/ai";
import NormalButton from "component/common/NormalButton/NormalButton";
// import SelectFilter from "component/common/Select";
import 'antd/dist/antd.css';
import UserOnBoardTable from "./UserOnBoardTable";
import { Link, useHistory } from "react-router-dom";
import { request } from "service";
import endponts from "service/endponts";
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Toast } from "service/toast";

const { Option } = Select;



const UserOnBoardComp = (props) => {
    const [searchBox, setsearchBox] = useState("");
    const [lists, setLists] = useState([]);
    const [pageMeta, setPageMeta] = useState({});
    const [page, setPage] = useState(1);
    const [gender, setGender] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);

    const history = useHistory()



    useEffect(() => {
        getUserLists(page,pageLimit,'','',true)
    }, []);


    const getUserLists=(page,pageLimit,gender,search,showLoader)=>{
        setPage(page);
        setPageLimit(pageLimit);
        setGender(gender);

        let params = "?page="+page+"&limit="+pageLimit

        if(gender && gender != "All"){
            params += "&genderFilter="+gender
        }

        if(search){
            params += "&searchValue="+search
        }
        request({
            url: endponts.Endpoints.userLists+params,
            method: endponts.APIMethods.GET,
            isLoader:showLoader
        }).then(res => {
            setLists(res.data.data.list);
            setPage(page);
            setPageMeta(res.data.data.pageMeta);
        })
    }

    const updateUserStatus=(e,item)=>{
        request({
            url: endponts.Endpoints.updateSubAdminStatus,
            method: endponts.APIMethods.PUT,
            data:{
                "userStatus": e == "delete" ? 3 : (e ? 1 : 2),
                "uniqueUserID":item.uniqueUserID
            }
        }).then(res => {
            Toast({type:'success',message:res.data.message});
            getUserLists(page,pageLimit,gender,searchBox,true)
        })
    }
    
    const onClickEdit = (item,status) =>{
        history.push({
            pathname: "/admin/create-user",
            state: { status: status,item:item }
        });
    }
    return (
        <>
            <div className="onboard_title">
                <div className=" font-bold-28">User Onboard</div>
                    <NormalButton 
                    onClick={()=> onClickEdit({},false)}
                    dasboardButton className="font-regular-16" label="User Onboard" />
            </div>
            <div className="search_filter mt-3">
                <div className="searchBox">
                    <input
                        className="searchInput"
                        value={searchBox}
                        onChange={(e) => {
                            setsearchBox(e.target.value)
                            if(e.target.value.length > 2){
                                getUserLists(1,10,gender,e.target.value,false)
                            }
                            
                            if(e.target.value.length == 0){
                                getUserLists(1,10,gender,'',false)
                            }
                        }}
                        placeholder={"Search User ID or User Name"}
                    />
                    <div className="mr-2" style={{
                        marginTop: '7px'
                    }}>
                        <AiOutlineSearch size={20} color="#C7C7C7" />
                    </div>
                </div>
                <div className="gender_filter">
                    <label className="mr-3 font-bold-14">Gender</label>
                     <div className='select_dropdown'>
                                <Select
                                    onChange={(e)=> getUserLists(1,10,e,searchBox,true)}
                                    defaultValue={"All"} style={{ width: 120 }} >
                                    <Option value={"All"}>{"All"}</Option>
                                    <Option value={"Male"}>{"Male"}</Option>
                                    <Option value={"Female"}>
                                        {"Female"}
                                    </Option>
                                </Select>
                            </div>
                </div>
            </div>
            <UserOnBoardTable
                lists={lists}
                pageMeta={pageMeta}
                page={page}
                pageLimit={pageLimit}
                onSwitchChange={(e,item)=> updateUserStatus(e,item)}
                setPageLimit={(page,limit)=> getUserLists(page,limit,gender,searchBox,true)}
                onClickDelete={(item) => updateUserStatus("delete",item)}
                onChangePage={(page,limit) => getUserLists(page,limit,gender,searchBox,true)}
                onClickEdit={(item) => onClickEdit(item,true)}
            />
        </>
    )
};
export default UserOnBoardComp;

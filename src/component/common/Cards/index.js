import React from 'react'
import './styles.scss'
import { BiUserCheck } from "react-icons/bi";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { FaSchool } from "react-icons/fa";

const Cards = () => {
    return (
        <>
            <div className='row'>
                <div className='col-3'>
                    <div className='card_header'>
                        <div className="card_icon">
                            <BiUserCheck size={25} color="#5F2EEA" />
                        </div>
                        <div className="ml-3">
                            <label className="font-bold-14 mt-2 total_user">Total User</label>
                            <h6 className="font-bold-21 user_count ">6236</h6>
                            <div>
                                <span><AiOutlineRise color="228B22" /></span>
                                <span className="count_number">4.07%</span>
                                <span className="month">Last Month</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='col-3'>
                    <div className='card_header'>
                        <div className="card_icon">
                            <FaSchool size={25} color="#F79433" />
                        </div>
                        <div className="ml-3">
                            <label className="font-bold-14 mt-2 total_user">Total School </label>
                            <h6 className="font-bold-21 user_count ">5343</h6>
                            <div>
                                <span><AiOutlineFall color="FC476E" /></span>
                                <span className="count_number_two">4.07%</span>
                                <span className="month">Last Month</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='col-3'>
                    <div className='card_header'>
                        <div className="card_icon">
                            <BiUserCheck size={25} color="#5F2EEA" />
                        </div>
                        <div className="ml-3">
                            <label className="font-bold-14 mt-2 total_user">Total User</label>
                            <h6 className="font-bold-21 user_count ">6236</h6>
                            <div>
                                <span><AiOutlineRise color="228B22" /></span>
                                <span className="count_number">4.07%</span>
                                <span className="month">Last Month</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='col-3'>
                    <div className='card_header'>
                        <div className="card_icon">
                            <FaSchool size={25} color="#F79433" />
                        </div>
                        <div className="ml-3">
                            <label className="font-bold-14 mt-2 total_user">Total School </label>
                            <h6 className="font-bold-21 user_count ">5343</h6>
                            <div>
                                <span><AiOutlineFall color="FC476E" /></span>
                                <span className="count_number_two">4.07%</span>
                                <span className="month">Last Month</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Cards
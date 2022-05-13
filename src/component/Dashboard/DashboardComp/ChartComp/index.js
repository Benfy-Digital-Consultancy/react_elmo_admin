import React, { useState } from 'react'
import '../styles.scss'
// import SelectFilter from "component/common/Select";
import Chart from 'react-apexcharts'
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;
const ChartComponent = (props) => {
    return (
        <div>
            <div className='row mb-3'>
                <div className='col-10'>
                    <div className='chart_header'>
                        <div className="chart_title">
                            <label className="font-bold-18">{props?.title}</label>
                            <div className='select_dropdown'>
                                <Select
                                    onChange={(e)=> (props && props?.onChange) ? props?.onChange(e) : {}}
                                    defaultValue={"This Week"} style={{ width: 120 }} >
                                    <Option value={"This Week"}>{"This Week"}</Option>
                                    <Option value={"This Month"}>{"This Month"}</Option>
                                    <Option value={"This Year"}>
                                        {"This Year"}
                                    </Option>
                                </Select>
                            </div>
                        </div>
                        <div className="blank" />
                        <div className="donut mt-1">
                            {console.log(props?.data,'props?.data')}
                            {
                                props?.data && props?.data?.series && props?.data?.series?.length > 0 ? <Chart
                                    options={props?.data?.options ? props?.data?.options : {}}
                                    series={props?.data?.series ? props?.data?.series : []}
                                    type="donut"
                                    width="350" /> : <p className='noData'>No Data</p>
                            }

                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    {/* <div className='chart_header'>
                        <div className="chart_title">
                            <label className="font-bold-18">Type of Education Board</label>
                            <SelectFilter
                                optionOne="This Week"
                                optionTwo="This Month"
                                optionThree="This Year"
                            />
                        </div>
                        <div className="blank" />
                        <div className="donut">
                            <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}
export default ChartComponent
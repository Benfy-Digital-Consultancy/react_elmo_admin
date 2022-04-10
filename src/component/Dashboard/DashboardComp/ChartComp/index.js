import React, { useState } from 'react'
import '../styles.scss'
import SelectFilter from "component/common/Select";
import Chart from 'react-apexcharts'

const ChartComponent = () => {
    const [chartData, setChartData] = useState({
        options: { labels: ['State Board', 'CBSE', 'CISCE', 'NIOS', 'IB', 'IGCSE'] },
        series: [44, 55, 41, 17, 15, 30],
    }
    )
    return (
        <div>
            <div className='row mb-3'>
                <div className='col-6'>
                    <div className='chart_header'>
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
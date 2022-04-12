import React, { useEffect, useState } from "react";
import './styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { SchemeDetailsHeader } from "../../../service/helpers/Constants";
import Cards from "component/common/Cards";
import ChartComponent from "./ChartComp";
import { request } from "service";
import endponts from "service/endponts";
import moment from "moment";




const DashboardComp = (props) => {
  const [tableData, setTableData] = useState([]);
  const [cardData, setCardData] = useState({});
  const [chartData, setChartData] = useState({});
  const [dateSelect, setDateSelect] = useState("This Week");


  useEffect(() => {
    request({
      url: endponts.Endpoints.commonDashboard,
      method: endponts.APIMethods.GET,
    }).then(res => {
      setTableData(res.data.data.latestOnboardedSchools);
      setCardData({
        user: res.data.data.userCount,
        school: res.data.data.schoolCount,
      });
    });
  }, [])


  useEffect(() => {

    let fromDate = ""
    let toDate = ""

    switch (dateSelect) {
      case 'This Week':{
        var currentDate = new Date();
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        fromDate = moment(oneWeekAgo).format("YYYY-MM-DD");
        toDate = moment(currentDate).format("YYYY-MM-DD");;

        break;
      }
      case 'This Month':{
        var currentDate = new Date();
        var oneWeekAgo = new Date();
        oneWeekAgo.setMonth(oneWeekAgo.getMonth() - 1);
        fromDate = moment(oneWeekAgo).format("YYYY-MM-DD");
        toDate = moment(currentDate).format("YYYY-MM-DD");;

        break;
      }
      case 'This Year':{
        var currentDate = new Date();
        var oneWeekAgo = new Date();
        oneWeekAgo.setFullYear(oneWeekAgo.getFullYear() - 1);
        fromDate = moment(oneWeekAgo).format("YYYY-MM-DD");
        toDate = moment(currentDate).format("YYYY-MM-DD");;
        break;
      }

    }

    request({
      url: endponts.Endpoints.boardOnboardAnalytics + "?fromDate="+fromDate+"&toDate="+toDate,
      method: endponts.APIMethods.GET,
    }).then(response => {
      let {data}= response.data;
      console.log(data);
      let labels = [];
      let series = [];

      let item = data ? data : [];

      item.forEach(element => {
          labels.push(element._id);
          series.push(element.count);
      });
      let chartItem = {
        options : {
          labels : labels
        },
        series:series
      }
      setChartData(chartItem)
    })
  }, [dateSelect])



  return (
    <>
      <div className="dashboard-title font-bold-28">Dashboard</div>
      <div className="mb-4">
        <Cards
          data={cardData} />
      </div>
      <div>
        
        <ChartComponent
          onChange={(e) => setDateSelect(e)}
          data={chartData} />
      </div>

      <div>
        <div className="table_subTitle mt-4">
          <label >New Schools Onboarded</label>
        </div>
        <TableWrapper
          className="table-block"
          headerDetails={SchemeDetailsHeader}
        >
          {tableData.map((item, index) => {
            return (
              <tr className="table_row">
                <td align="center">{index + 1}</td>
                <td align="center">{item.schoolId}</td>
                <td align="center">{item.school_logo}</td>
                <td align="center">{item.schoolName}</td>
                <td align="center">{item.schoolBoard}</td>
                <td align="center">{item.email}</td>
              </tr>
            )
          })}

        </TableWrapper>
      </div>

    </>

  )
};
export default DashboardComp;

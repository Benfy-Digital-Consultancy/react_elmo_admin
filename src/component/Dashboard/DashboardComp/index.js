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
  }, []);




  useEffect(() => {

    let fromDate = ""
    let toDate = ""
    var currentDate = new Date();
    var oneWeekAgo = new Date();
    currentDate.setDate(currentDate.getDate() + 1)
    switch (dateSelect) {
      case 'This Week': {
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        break;
      }
      case 'This Month': {
        oneWeekAgo.setMonth(oneWeekAgo.getMonth() - 1);
        break;
      }
      case 'This Year': {
        oneWeekAgo.setFullYear(oneWeekAgo.getFullYear() - 1);
        break;
      }

    }
    fromDate = moment(oneWeekAgo).format("YYYY-MM-DD");
    toDate = moment(currentDate).format("YYYY-MM-DD");;

    request({
      url: endponts.Endpoints.boardOnboardAnalytics + "?fromDate=" + fromDate + "&toDate=" + toDate,
      method: endponts.APIMethods.GET,
    }).then(response => {
      let { data } = response.data;
      console.log(data);
      let labels = [];
      let series = [];

      let item = data ? data : [];

      item.forEach(element => {
        labels.push(element._id);
        series.push(element.count);
      });
      let chartItem = {
        options: {
          labels: labels
        },
        series: series
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
                <td align="left" style={{
                  paddingLeft: 50
                }}>{index + 1}</td>
                <td align="left">{item.schoolId}</td>
                <td align="center" style={{
                  paddingRight:70
                }}>
                  <img
                    className="profile_pic"
                    src={item.profilePicture} />
                </td>
                <td align="left">{item.schoolName}</td>
                <td align="left">{item.schoolBoard}</td>
                <td align="left">{item.email}</td>
              </tr>
            )
          })}

        </TableWrapper>
      </div>

    </>

  )
};
export default DashboardComp;

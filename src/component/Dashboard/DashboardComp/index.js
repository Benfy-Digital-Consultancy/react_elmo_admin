import React, { useState } from "react";
import './styles.scss'
import TableWrapper from "component/common/TableWrapper";
import { SchemeDetailsHeader } from "../../../service/helpers/Constants";
import Cards from "component/common/Cards";
import ChartComponent from "./ChartComp";




const DashboardComp = (props) => {
  const [tableData, setTableData] = useState([
    {
      sno: "1",
      school_id: "KHS32890",
      school_logo: "logo",
      school_name: "chennai public school",
      board: "Matriculation",
      email_id: "SBOA@info.in"
    },
    {
      sno: "1",
      school_id: "KHS32890",
      school_logo: "logo",
      school_name: "chennai public school",
      board: "Matriculation",
      email_id: "SBOA@info.in"
    }


  ])
  return (
    <>
      <div className="dashboard-title font-bold-28">Dashboard</div>
      <div className="mb-4">
        <Cards />
      </div>
      <div>
        <ChartComponent />
      </div>

      <div>
        <div className="table_subTitle mt-4">
          <label >New Schools Onboarded</label>
        </div>
        <TableWrapper
          className="table-block"
          headerDetails={SchemeDetailsHeader}
        >
          {tableData.map((item) => {
            return (
              <tr className="table_row">
                <td align="center">{item.sno}</td>
                <td align="center">{item.school_id}</td>
                <td align="center">{item.school_logo}</td>
                <td align="center">{item.school_name}</td>
                <td align="center">{item.board}</td>
                <td align="center">{item.email_id}</td>
              </tr>
            )
          })}

        </TableWrapper>
      </div>

    </>

  )
};
export default DashboardComp;

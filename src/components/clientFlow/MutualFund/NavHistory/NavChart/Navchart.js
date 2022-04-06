import React from "react";
import Highcharts from "highcharts";
import * as Exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { EmptyRecord } from "components/Common/EmptyRecord";

Exporting(Highcharts);
const NavChart = ({ chartOptions }) => {
  return chartOptions.series[0]?.data?.length !== 0 ? (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  ) : (
    <EmptyRecord />
  );
};
export default NavChart;

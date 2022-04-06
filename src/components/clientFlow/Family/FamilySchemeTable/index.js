import React, { useState } from "react";
import {
  amountWithoutRs,
  percentageValidatorWOP,
} from "service/helperFunctions";
import { FamilySchemeTableHeader } from "service/helpers/Constants";
import { EmptyRecord } from "components/Common/EmptyRecord";
import TableWrapper from "components/Common/TableWrapper";
import { endpoints } from "service/helpers/config";
import FamilySchemePopup from "../FamilySchemePopup/index";
import "../Family.scss";

const FamilySchemeTable = ({
  familySchemeDetailsTable,
  getFamilyDetailsGridApi,
}) => {
  const [popup, setPopup] = useState(false);
  const [schemeData, setSchemeData] = useState({});
  const [memberData, setMemberData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);

  const getSchemeData = (item) => {
    let body = {
      Operation: "2",
      SchemeCode: item?.Code,
      UserId: "",
    };
    getFamilyDetailsGridApi(body).then((data) => {
      setSchemeData(data?.SchemeDetails);
      setMemberData(data?.MemberDetails);
      setPopup(true);
    });
  };

  return (
    <React.Fragment>
      {familySchemeDetailsTable?.length > 0 ? (
        <TableWrapper
          className="table-block"
          headerDetails={FamilySchemeTableHeader}
          handlePageSize={(pageSize) => {
            setPage(1);
            setPageLimit(pageSize);
          }}
          pageNumber={page}
          pageSize={pageLimit}
          pageChange={setPage}
          totalPages={familySchemeDetailsTable?.length / pageLimit}
        >
          {familySchemeDetailsTable?.map((item, index) => {
            return (
              page * pageLimit >= index + 1 &&
              (page - 1) * pageLimit < index + 1 && (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <div
                        className="primary-color cursor-pointer"
                        onClick={() => {
                          getSchemeData(item);
                        }}
                      >
                        {item?.Name}
                      </div>
                      <p>{item?.SchemeCategoryType}</p>
                    </td>
                    <td align="right">
                      {amountWithoutRs(item?.TotalInvestment)}
                    </td>
                    <td align="right">{amountWithoutRs(item?.CurrentValue)}</td>
                    <td align="right">{amountWithoutRs(item?.RealisedGain)}</td>
                    <td align="right">
                      {amountWithoutRs(item?.UnrealisedGain)}
                    </td>
                    <td align="right">
                      {amountWithoutRs(item?.DividentPayout)}
                    </td>
                    <td align="right">{amountWithoutRs(item?.TotalProfit)}</td>
                    <td align="right">
                      {percentageValidatorWOP(item?.AbsoluteReturn)}
                    </td>
                    <td align="right">{percentageValidatorWOP(item?.XIRR)}</td>
                  </tr>
                  {familySchemeDetailsTable?.length - 1 > index && (
                    <tr className="empty-height">
                      <td colSpan="9"></td>
                    </tr>
                  )}
                </React.Fragment>
              )
            );
          })}
        </TableWrapper>
      ) : (
        <EmptyRecord />
      )}
      {popup === true && (
        <FamilySchemePopup
          openPopup={popup}
          setPopup={setPopup}
          schemeData={schemeData}
          memberData={memberData}
        />
      )}
    </React.Fragment>
  );
};

export default FamilySchemeTable;

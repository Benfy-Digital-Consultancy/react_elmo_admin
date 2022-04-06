import React, { useState } from "react";
import {
  percentageValidator,
  numberToRupees,
  amountWithRs,
  imageConditionValidate,
} from "service/helperFunctions";
import Popup from "components/Common/Popup/Popup";
import { EmptyRecord } from "components/Common/EmptyRecord";
import Pagination from "components/Common/Pagination/Pagination";
import "../Family.scss";
import { useLang } from "hooks/useLang";

const FamilSchemePopup = ({ openPopup, setPopup, schemeData, memberData }) => {
  const { Labels } = useLang();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  return (
    <React.Fragment>
      <Popup isOpen={openPopup} setPopup={setPopup}>
        <div className="popup-title">{Labels.schemeDetails} </div>
        <div className="family-popup-content">
          <div className="border-content">
            <div className="title">{schemeData?.Name}</div>
            <div className="sub-title">
              {schemeData?.SchemeCategory.split(":")[0].toUpperCase()}
              {":"}
              <span className="fw-600">
                {schemeData?.SchemeCategory.substring(
                  schemeData?.SchemeCategory.indexOf(":") + 1
                ).toUpperCase()}
              </span>
            </div>
            <div className="list-outer w-50 col-2">
              <div className="list">
                <div className="label">{Labels.latestNav} :</div>
                <div className="value">{amountWithRs(schemeData?.NAV)}</div>
              </div>
              <div className="list">
                <div className="label">{Labels.navDate} : </div>
                <div className="value">{schemeData?.NAV_Date}</div>
              </div>
            </div>
          </div>
        </div>
        {memberData?.length > 0 ? (
          memberData?.map((item, index) => {
            return (
              page * pageCount >= index + 1 &&
              (page - 1) * pageCount < index + 1 && (
                <div key={index} className="family-popup-content mb-5">
                  <div className="name">{item?.Name}</div>
                  <div className="list-outer">
                    <div className="left">
                      <table width="100%">
                        <tbody>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.investment} {Labels.value} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {numberToRupees(item?.TotalInvestment)}
                              </div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.currentValue} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {numberToRupees(item?.CurrentValue)}
                              </div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">{Labels.units} : </div>
                            </td>
                            <td align="right">
                              <div className="value">{item?.Units}</div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.realisedGain} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {numberToRupees(item?.RealisedGain)}
                              </div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.unrealisedGain} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {numberToRupees(item?.UnrealisedGain)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="right">
                      <table width="100%">
                        <tbody>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.dividentPaid} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {numberToRupees(item?.DividentPayout)}
                              </div>
                            </td>
                            <td>
                              <div align="right"></div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.totalProfit} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {numberToRupees(item?.TotalProfit)}
                              </div>
                            </td>
                            <td>
                              <div align="right"></div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">
                                {Labels.absoluteReturn} :
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {percentageValidator(item?.AbsoluteReturn)}
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {imageConditionValidate(item?.AbsoluteReturn)}
                              </div>
                            </td>
                          </tr>
                          <tr className="list-content">
                            <td align="left">
                              <div className="label">{Labels.XIRR} :</div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {percentageValidator(item?.XIRR)}
                              </div>
                            </td>
                            <td align="right">
                              <div className="value">
                                {imageConditionValidate(item?.XIRR)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <EmptyRecord label={Labels.noMembersFound} />
        )}
        {memberData && memberData?.length > 0 && (
          <Pagination
            pageNumber={page}
            pageChange={setPage}
            handlePageSize={(limit) => {
              setPageCount(limit);
              setPage(1);
            }}
            totalPages={memberData?.length / pageCount}
            pageOption={true}
          />
        )}
      </Popup>
    </React.Fragment>
  );
};
export default FamilSchemePopup;

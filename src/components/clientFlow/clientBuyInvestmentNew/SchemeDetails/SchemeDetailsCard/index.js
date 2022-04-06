import React from "react";
import { withRouter } from "react-router-dom";
import MenuList from "components/Common/MenuList";
import { amountWithRs } from "service/helperFunctions";
import { NormalCheckbox } from "components/Common/NormalCheckbox";
import { useLang } from "hooks/useLang";

const SchemeDetailsEdit = ({ schemeData, handleChangeCheckbox }) => {
  const { Labels } = useLang();

  return (
    <div className="scheme-card-parent">
      <div className="scheme-card-container">
        <div className="row">
          <div className="col-md-1 d-flex justify-content-center">
            <NormalCheckbox
              className="custom-checkbox check-box"
              name="createMandateBankCheckbox"
              onChange={() => handleChangeCheckbox(schemeData)}
            />
          </div>
          <div className="col-md-6">
            <div className="scheme-title-container">
              <h6 className="title mb-0">{schemeData?.SchemeName}</h6>
            </div>

            <div className="scheme-card-content">
              <div className="scheme-card-subtitle scheme-tilte-padding">
                <span className="scheme-withoutbold">
                  {schemeData?.SchemeType.split(":")[0]} :{" "}
                  <span className="scheme-withbold">
                    {schemeData?.SchemeType.substring(
                      schemeData?.SchemeType.indexOf(":") + 1
                    )}
                  </span>
                </span>
              </div>
              <div className="scheme-card-subtitle scheme-tilte-padding">
                <span className="scheme-withoutbold">
                  {Labels?.latestNav} :{" "}
                  <span className="scheme-withbold">
                    {schemeData?.NAV_Value
                      ? amountWithRs(schemeData?.NAV_Value)
                      : "-"}
                  </span>
                </span>
              </div>{" "}
              <div className="scheme-card-subtitle scheme-tilte-padding">
                <span className="scheme-withoutbold">
                  {Labels.annualizedReturn} : Less than 1 year-Absolute{" "}
                </span>
              </div>{" "}
            </div>
            <div className="scheme-card-content">
              <div className="scheme-card-subtitle scheme-tilte-left">
                <span className="scheme-withoutbold">
                  {Labels.oneMonth} :{" "}
                  <span className="scheme-withbold">
                    {schemeData?.OneMonthReturn
                      ? schemeData?.OneMonthReturn
                      : "-"}
                  </span>
                </span>
              </div>{" "}
              <div className="scheme-card-subtitle scheme-tilte-left">
                <span className="scheme-withoutbold">
                  {Labels.oneYear} :{" "}
                  <span className="scheme-withbold">
                    {schemeData?.OneYearReturn
                      ? schemeData?.OneYearReturn
                      : "-"}
                  </span>
                </span>
              </div>{" "}
              <div className="scheme-card-subtitle scheme-tilte-left">
                <span className="scheme-withoutbold">
                  {Labels.threeYear} :{" "}
                  <span className="scheme-withbold">
                    {schemeData?.ThreeYearReturn
                      ? schemeData?.ThreeYearReturn
                      : "-"}
                  </span>
                </span>
              </div>{" "}
              <div className="scheme-card-subtitle scheme-tilte-left">
                <span className="scheme-withoutbold">
                  {Labels.fiveYear} :{" "}
                  <span className="scheme-withbold">
                    {schemeData?.FiveYearReturn
                      ? schemeData?.FiveYearReturn
                      : "-"}
                  </span>
                </span>
              </div>{" "}
            </div>
          </div>
          <div className="col-md-4">
            <div className="invest-icon-section">
              <div className="mutual-fund">
                <div className="bottom-section">
                  <div className="dropdown-list-outer">
                    <div className="dropdown-list">
                      <div className="dropdown-list-header">
                        <MenuList
                          screen={"scheme"}
                          item={schemeData}
                          NoFolioNumber
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SchemeDetailsEdit);

import React, { useEffect, useState } from "react";
import "./style.scss";
import MenuList from "components/Common/MenuList";
import { CommonInput } from "components/Common/CommonInput";
import { CommonSelect } from "components/Common/CommonSelect";
import { CommonAutoSearchSuggestion } from "components/Common/CommonAutoSearchSuggestion";
import { amountWithRs } from "service/helperFunctions";
import { useLang } from "hooks/useLang";

const InvestYearsHeading = ({
  buyInvestData,
  formFieldData,
  formFieldIndex,
  getFolioFromChild,
}) => {
  const { Labels } = useLang();

  const [folioDropdownData, setFolioDropdownData] = useState([]);
  const [folioDropdownValue, setFolioDropdownValue] = useState("");

  useEffect(() => {
    if (formFieldData) {
      if (formFieldData.FolioListArray.length > 0) {
        let folioList = [];
        formFieldData.FolioListArray.forEach((item) => {
          folioList.push({
            label: item,
            value: item,
            index: formFieldIndex,
          });
        });
        setFolioDropdownData(folioList);
        setFolioDropdownValue(folioList[0]);
      }
    }
  }, [formFieldData?.FolioListArray]);

  // handleInputChange

  const handleInputChange = ({ target: { value } }) => {
    setFolioDropdownValue(value);
    let filterFolioIndex = folioDropdownData.find(
      (item) => item.value === value
    );

    console.log("handlechange value", filterFolioIndex?.index);

    getFolioFromChild(value, filterFolioIndex?.index);
  };

  const onSelectOptionValue = (value, option) => {
    setFolioDropdownValue(option.children);
    let filterFolioIndex = folioDropdownData.find(
      (item) => item.value === value
    );
    console.log("handlechange value", filterFolioIndex?.index);
    getFolioFromChild(value, filterFolioIndex?.index);
  };

  return (
    <>
      <div className="title_width">
        <div className="title">
          {buyInvestData?.SchemeName}

          <div className="invest-icon-section">
            <div className="mutual-fund">
              <div className="bottom-section">
                <div className="dropdown-list-outer">
                  <div className="dropdown-list">
                    <div className="dropdown-list-header">
                      <MenuList item={buyInvestData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {buyInvestData?.SchemeType && (
        <div className="sub-title">
          <div>
            <span className="sub-title-firstheading">
              {" "}
              {buyInvestData?.SchemeType.split(":")?.[0]}:{" "}
            </span>
            <span className="sub-title-secondheading">
              {" "}
              {buyInvestData?.SchemeType.split(":")?.[1]}{" "}
            </span>
          </div>
          <div className="sub-title-margin">
            <span className="sub-title-firstheading">
              {" "}
              {Labels.latestNav} :{" "}
            </span>
            {buyInvestData?.NAV_Value && (
              <span className="sub-title-secondheading">
                {" "}
                {amountWithRs(buyInvestData?.NAV_Value)}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="invest-folionumber">
        <div className="col-md-3">
          {folioDropdownData && folioDropdownData.length > 0 && (
            <CommonAutoSearchSuggestion
              headerClassName="w-50"
              subClassName="w-100"
              onChange={(e) => handleInputChange(e, folioDropdownData)}
              placeholder={Labels.folioNumber}
              optionsList={folioDropdownData}
              value={folioDropdownValue}
              onSelectOption={onSelectOptionValue}
              // defaultValue={folioDropdownValue}
            />
            // <CommonSelect
            //   options={folioDropdownData}
            //   defaultValue={folioDropdownValue}
            //   name="individual"
            //   value={folioDropdownValue}
            //   label="Folio Number"
            //   onChange={(e) => handleInputChange(e, folioDropdownData)}
            //   showSearch={true}
            // />
          )}
        </div>
      </div>
    </>
  );
};

export default InvestYearsHeading;

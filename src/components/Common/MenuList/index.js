import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popover } from "antd";
import InfoIcon from "assets/images/info.svg";
import MoreIcon from "assets/images/more-vertical.svg";
import RightArrow from "assets/images/right-arrow-grey.svg";
import DownArrow from "assets/images/down-arrow.svg";
import ShareIcon from "assets/images/share.svg";
import DollarIcon from "assets/images/dollar.svg";
import FactSheetIcon from "assets/images/factsheet.svg";
import MapPinIcon from "assets/images/map-pin.svg";
import LinkIcon from "assets/images/link-icon.svg";
import { getFactSheet } from "redux/action/clientFlow/MutualFundAct";
import FactSheet from "../../clientFlow/MutualFund/FactSheet/index";
import { encryptData } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { ToolTip } from "../ToolTip";
import { useLang } from "hooks/useLang";
import ShareOptions from "../ShareOptions";

const MenuList = (props) => {
  const { Labels } = useLang();
  const {
    item,
    index,
    setDropdownId,
    getFactSheetApi,
    dynamicClass,
    screen,
    NoFolioNumber,
    setOpenGoalPopup,
    activeTab,
  } = props;
  const [multiSelctedValue, seMultiSelctedValue] = useState([]);
  const [mulitSelectYearList, setmulitSelectYearList] = useState([]);
  const [factSheetlist, setFactSheetList] = useState([]);
  const [dublicateSheeList, setDublicateSheeList] = useState(factSheetlist);
  const [factsheetPopupView, setFactsheetPopupView] = useState(false);
  const [factsheetPopup, setFactsheetPopup] = useState(false);
  const [pdfPath, setPdfPath] = useState([]);
  const [factSheet, setFactSheet] = useState(false);
  const {
    NAV_HISTORY_DATA,
    NAV_HISTORY_DATA_KEY,
    SCHEME_DETAILS,
    SCHEME_DATA,
  } = endpoints.auth;

  const getFactSheetMethod = (AMCCODE) => {
    let body = {
      FormID: null,
      AMCCode: AMCCODE,
      FormYear: null,
      FormMonth: null,
      IsFactsheetRequired: "true",
      RecordLimit: "12",
    };
    getFactSheetApi(body).then((response) => {
      const year_data = [];
      for (let i = 0; i <= response?.FormList?.length; i++) {
        const year = moment(response?.FormList[i]?.FactsheetMonthYear).format(
          "YYYY"
        );
        year_data.push(year);
      }
      const year_list = [...new Set(year_data)];
      setmulitSelectYearList([...year_list]);
      setFactSheetList(response?.FormList);
      setDublicateSheeList(response?.FormList);
    });
  };

  const filterYearBasedFactSheet = (selectedList) => {
    const filterData = [];
    for (let i = 0; i < selectedList.length; i++) {
      for (let j = 0; j < dublicateSheeList.length; j++) {
        if (
          selectedList[i] ===
          moment(dublicateSheeList[j].FactsheetMonthYear).format("YYYY")
        ) {
          filterData.push(dublicateSheeList[j]);
        }
      }
    }
    setFactSheetList(selectedList.length > 0 ? filterData : dublicateSheeList);
  };

  const onSelect = (selectedList) => {
    seMultiSelctedValue(selectedList);
    filterYearBasedFactSheet(selectedList);
  };

  const onRemove = (selectedList) => {
    seMultiSelctedValue(selectedList);
    filterYearBasedFactSheet(selectedList);
  };

  const handleProceed = (storageName, storageType) => {
    const encryptedRoleData = encryptData(item, storageType);
    sessionStorage.setItem(storageName, encryptedRoleData);
  };

  return (
    <React.Fragment>
      <div className="right">
        {screen === endpoints.Home &&
        item?.LinkToGoalMessage === "Link to a <GOAL>" &&
        activeTab !== "Existed Investments" ? (
          <ToolTip
            children={
              <img
                onClick={() => {
                  if (item?.LinkToGoalMessage === endpoints?.linkToGoal) {
                    setOpenGoalPopup(true);
                  }
                }}
                className="cursor-pointer"
                alt="linkIcon"
                src={LinkIcon}
              />
            }
            label={Labels.goal}
          />
        ) : null}
        <Link
          onClick={() => handleProceed(SCHEME_DETAILS, SCHEME_DATA)}
          to={"/mutual-fund/scheme-details"}
        >
          <ToolTip
            children={
              <img className="cursor-pointer" alt="info" src={InfoIcon} />
            }
            label={Labels.schemeDetails}
          />
        </Link>
        <ToolTip
          children={
            <Popover
              content={
                <div className="menu-list-popover">
                  <div className="mutual-fund">
                    <div className="bottom-section">
                      <div className="dropdown-list-outer">
                        <div className="dropdown-list">
                          <div className="dropdown-list-header">
                            <div className="right active">
                              <div className="list-menu">
                                {screen !== "scheme" && (
                                  <div className="list-menu-list cursor-pointer">
                                    {Labels.share}
                                    <img
                                      className="cursor-pointer"
                                      alt="shareIcon"
                                      src={ShareIcon}
                                    />
                                    <ShareOptions
                                      item={""}
                                      copyToClipboard={""}
                                    />
                                  </div>
                                )}
                                <div
                                  className="list-menu-list cursor-pointer"
                                  onClick={() => {
                                    setFactsheetPopup(true);
                                    getFactSheetMethod(item?.AMCCode);
                                    setFactSheet(true);
                                  }}
                                >
                                  Factsheet{" "}
                                  <img
                                    alt="factSheetIcon"
                                    src={FactSheetIcon}
                                  />
                                </div>
                                <Link
                                  onClick={() =>
                                    handleProceed(
                                      NAV_HISTORY_DATA_KEY,
                                      NAV_HISTORY_DATA
                                    )
                                  }
                                  to={"/mutual-fund/nav-history"}
                                  className="nav-history-link"
                                >
                                  <div className="list-menu-list cursor-pointer">
                                    {Labels.navHistory}{" "}
                                    <img alt="mapPinIcon" src={MapPinIcon} />
                                  </div>
                                </Link>
                                {!NoFolioNumber && (
                                  <div
                                    className="list-menu-list cursor-pointer"
                                    onClick={() =>
                                      props.history.push(
                                        `/dashboard/mutual-fund/transaction-history?RTASchemeCode=${
                                          item?.SchemeCode ||
                                          item?.RTASchemeCode
                                        }&FolioNo=${item?.FolioNo}&PAN=${
                                          item?.PANNo
                                        }`
                                      )
                                    }
                                  >
                                    {Labels.transactionHistory}{" "}
                                    <img alt="dollarIcon" src={DollarIcon} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              placement="bottomLeft"
              overlayClassName="parent-popuover"
            >
              <img
                className="cursor-pointer"
                alt="moreIcon"
                src={MoreIcon}
                style={{ marginRight: "25px" }}
              />
            </Popover>
          }
          label={Labels.menu}
        />
        {screen === endpoints.Home ? (
          <ToolTip
            children={
              dynamicClass ? (
                <div>
                  <img
                    className="cursor-pointer"
                    alt="downArrow"
                    src={DownArrow}
                    style={{ width: "15px", marginLeft: "10px" }}
                    onClick={() => setDropdownId("")}
                  />
                </div>
              ) : (
                <img
                  className="cursor-pointer"
                  alt="rightArrow"
                  style={{ width: "10px", marginLeft: "10px" }}
                  src={RightArrow}
                  onClick={() => setDropdownId("mutual-fund-list-" + index)}
                />
              )
            }
            label={dynamicClass ? Labels.collapse : Labels.expand}
          />
        ) : null}
      </div>
      {factSheet === true ? (
        <FactSheet
          setFactsheetPopup={setFactsheetPopup}
          multiSelctedValue={multiSelctedValue}
          mulitSelectYearList={mulitSelectYearList}
          dublicateSheeList={dublicateSheeList}
          factSheetlist={factSheetlist}
          setFactSheetList={setFactSheetList}
          setDublicateSheeList={setDublicateSheeList}
          factsheetPopupView={factsheetPopupView}
          setFactsheetPopupView={setFactsheetPopupView}
          factsheetPopup={factsheetPopup}
          pdfPath={pdfPath}
          setPdfPath={setPdfPath}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ) : null}
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getFactSheetApi: getFactSheet,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(MenuList));

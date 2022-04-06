import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { endpoints } from "service/helpers/config";
import DownArrowRed from "assets/images/downarrow-red.svg";
import UpArrowGreen from "assets/images/up-arrow-green.svg";
import { ClientMutualFundType } from "service/actionType";
import { percentageValidator, numberToRupees } from "service/helperFunctions";
import { MutualFundTitles } from "service/helpers/Constants";
import InsideTabLinks from "../InsideTabLinks/index";
import TabBarContent from "../TabBarContent/index";
import InsideContent from "../InsideTabContent/index";
import DownloadStatement from "../DownloadStatement";
import MenuList from "components/Common/MenuList";
import GoalPopup from "../GoalPopup";
import { useLang } from "hooks/useLang";
import ".././MutualFund.scss";

const TabBar = (props) => {
  const { Labels } = useLang();
  const { UserReferralInfo, investmentSummaryV4list } = props;
  const [dropdownId, setDropdownId] = useState("");
  const [popup, setPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(Labels?.currentInvestments);
  const [openGoalPopup, setOpenGoalPopup] = useState(false);

  const handleScrollSetId = (id) => {
    props.dispatch({
      type: ClientMutualFundType.scrollPositionId,
      payload: id,
    });
  };

  useEffect(() => {
    if (props.scrollPositionId) {
      const scrollPositionIdList = document.getElementById(
        props.scrollPositionId
      );
      if (scrollPositionIdList) {
        scrollPositionIdList.scrollIntoView({
          behavior: "smooth",
        });
      }
      setDropdownId(`mutual-fund-list-${props.scrollPositionId}`);
    }
  }, [props]);

  return (
    <React.Fragment>
      <div className="bottom-section">
        <div className="tab-bar">
          {MutualFundTitles.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={
                    "tab cursor-pointer " +
                    (activeTab === item?.title ? "active" : "")
                  }
                  onClick={() => setActiveTab(item?.title)}
                >
                  {item?.title}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="tab-content">
          <div className="dropdown-list-outer">
            {investmentSummaryV4list?.map((item, index) => {
              var tabValue = dropdownId === "mutual-fund-list-" + index;
              if (
                (activeTab === Labels?.currentInvestments &&
                  item?.Units === 0) ||
                (activeTab === Labels?.existedInvestments && item?.Units !== 0)
              ) {
                return null;
              }
              return (
                <div
                  key={index}
                  id={index}
                  onClick={() => handleScrollSetId(index)}
                  className={`dropdown-list ${tabValue ? "active" : ""}`}
                >
                  <div className="dropdown-list-header">
                    <TabBarContent
                      item={item}
                      dropdownId={dropdownId}
                      numberToRupees={numberToRupees}
                      percentageValidator={percentageValidator}
                      UpArrowGreen={UpArrowGreen}
                      DownArrowRed={DownArrowRed}
                      index={index}
                      dynamicClass={tabValue}
                      setOpenGoalPopup={setOpenGoalPopup}
                      activeTab={activeTab}
                    />
                    <MenuList
                      item={item}
                      index={index}
                      dropdownId={dropdownId}
                      setDropdownId={setDropdownId}
                      dynamicClass={tabValue}
                      screen={endpoints.Home}
                      setOpenGoalPopup={setOpenGoalPopup}
                      activeTab={activeTab}
                    />
                  </div>
                  <div className="dropdown-list-content">
                    <InsideContent
                      item={item}
                      numberToRupees={numberToRupees}
                      percentageValidator={percentageValidator}
                      DownArrowRed={DownArrowRed}
                      UpArrowGreen={UpArrowGreen}
                    />
                    <InsideTabLinks
                      UserReferralInfo={UserReferralInfo}
                      item={item}
                      numberToRupees={numberToRupees}
                      activeTab={activeTab}
                    />
                    <DownloadStatement
                      item={item}
                      popup={popup}
                      setPopup={setPopup}
                    />
                    {openGoalPopup === true && (
                      <GoalPopup
                        openGoalPopup={openGoalPopup}
                        setOpenGoalPopup={setOpenGoalPopup}
                        item={item}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// export default TabBar;
let mapStateToProps = (state) => {
  return {
    scrollPositionId: state.mutualFundStore.scrollPositionId,
  };
};

export default connect(mapStateToProps, null)(withRouter(TabBar));

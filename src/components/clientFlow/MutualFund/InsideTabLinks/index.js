import React, { useState } from "react";
import { Link } from "react-router-dom";
import { encryptData } from "service/helperFunctions";
import StartSIP from "../StartSIP";
import { setDataFromStorage } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

const InsideTabLinks = (props) => {
  const { item, numberToRupees } = props;
  const { Labels } = useLang();
  const [activeTableTab, setActiveTableTab] = useState(Labels?.activeSIP);
  const buttonClass = "primary-btn bordered bottom-align";
  const {
    SELL_SWP_DETAILS,
    SELL_SWP_DETAILS_KEY,
    SWITCH_STP_DATA_KEY,
    SWITCH_STP_DATA,
    BUY_INVESTMENT_DATA,
    BUY_INVESTMENT_KEY,
    REDEEM_DETAILS,
    REDEEM_DETAILS_KEY,
  } = endpoints.auth;

  const handleProceed = (storageName, storageType) => {
    const encryptedRoleData = encryptData(item, storageType);
    sessionStorage.setItem(storageName, encryptedRoleData);
  };

  // handleToStoreSession
  const handleBuyInvestSession = () => {
    let investArray = [];
    investArray.push(item.RTASchemeCode);
    setDataFromStorage(investArray, BUY_INVESTMENT_DATA, BUY_INVESTMENT_KEY);
    // setDataFromStorage(item.FolioNo, BUY_FOLIO_DATA, BUY_FOLIO_KEY);
  };

  return (
    <React.Fragment>
      <div className="button-section">
        <div className="left">
          {item.SIPFlag === endpoints?.Y || item?.activeSIPList?.length < 0 ? (
            <Link to="/sip" className={buttonClass}>
              {Labels.startSip}
            </Link>
          ) : null}
          <Link
            onClick={() =>
              handleProceed(SELL_SWP_DETAILS, SELL_SWP_DETAILS_KEY)
            }
            to={`/dashboard/mutual-fund/sell`}
            className={buttonClass}
          >
            <span>{Labels.sell}</span>
          </Link>

          <Link
            onClick={() => {
              handleBuyInvestSession();
            }}
            to={"/buyInvestment"}
            className={buttonClass}
          >
            {Labels.invest}
          </Link>
          {item.SwitchFlag === endpoints?.Y ? (
            <Link
              onClick={() =>
                handleProceed(SWITCH_STP_DATA, SWITCH_STP_DATA_KEY)
              }
              to={"/mutual-fund/switch"}
              className={buttonClass}
            >
              {Labels.switch}
            </Link>
          ) : null}
          {item.STPFlag === endpoints?.Y ? (
            <Link
              onClick={() =>
                handleProceed(SWITCH_STP_DATA, SWITCH_STP_DATA_KEY)
              }
              to={"/mutual-fund/stp"}
              className={buttonClass}
            >
              {Labels.stp}
            </Link>
          ) : null}
          {item.SWPFlag === endpoints?.Y ? (
            <Link
              to={`/dashboard/mutual-fund/swp`}
              className={buttonClass}
              onClick={() =>
                handleProceed(SELL_SWP_DETAILS, SELL_SWP_DETAILS_KEY)
              }
            >
              {Labels.swp}
            </Link>
          ) : null}
          {item.InstantRedeemFlag === endpoints?.Y ? (
            <Link
              to="/investment/mutual-fund/redeem"
              className={buttonClass}
              onClick={() => handleProceed(REDEEM_DETAILS, REDEEM_DETAILS_KEY)}
            >
              {Labels.redeem}
            </Link>
          ) : null}
        </div>
        <div className="right"></div>
      </div>
      <StartSIP
        item={item}
        activeTableTab={activeTableTab}
        setActiveTableTab={setActiveTableTab}
        numberToRupees={numberToRupees}
      />
    </React.Fragment>
  );
};

export default InsideTabLinks;

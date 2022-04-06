import React, { useState } from "react";
import { NormalCheckbox } from "components/Common";
import { CommonSelect } from "components/Common/CommonSelect";
import { DatePicker } from "components/Common/DatePicker";
import { CommonInput } from "components/Common/CommonInput";
import { NormalRadioButton } from "components/Common/NormalRadioButton";
import Popup from "components/Common/Popup/Popup";
import { ToolTip } from "components/Common/ToolTip";
import InfoIcon from "assets/images/info.svg";
import "./style.scss";
import moment from "moment";
import MandatePopup from "../MandateInfoPopup";
import CutOfTimeModal from "../CutOfTimeModal";
import CreateMandate from "../CreateMandate";
import { MandateListDropdown } from "components/Common/MandateListDropdown";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { MandateListDropdownCard } from "components/Common/MandateListDropdownCard";
const numToWords = require("number-to-words");

export default function InvestAccordion({
  buyMandateData,
  handleChange,
  indexVal,
  formFileds = {},
  buyInvest,
  peroidSipSchemeDetails = {},
  errorFields,
}) {
  let [mandateView, setMandateViewPopup] = useState(false);
  let [cutOfTimeModal, setCutOfTimeModal] = useState(false);
  let [createmandateView, setCreateMandatePopup] = useState(false);
  let [createMandateHelp, setCreateMandateHelp] = useState(false);
  const { Labels, errorText } = useLang();

  const { error_allfiled_msg, error_first_order } =
    errorText?.sip_page_error || {};
  const disableDateRanges = (current) => {
    let index = formFileds.sipDateOption?.findIndex(
      (date) => date === moment(current).format("DD/MM/YYYY")
    );
    return index === -1;
  };

  let sipInstallmentAmountErr =
    Number(formFileds.sipInstallmentAmount) ===
      Number(peroidSipSchemeDetails.SIPMAXIMUMINSTALLMENTNUMBERS)
      ? "Equal"
      : Number(formFileds.sipInstallmentAmount) >
        Number(peroidSipSchemeDetails.SIPMINIMUMINSTALLMENTNUMBERS)
        ? "Maximum"
        : "Minimum";

  let oneTimePurChaseAmountErr =
    formFileds.oneTimePurChaseAmount <
      buyInvest?.schemesDetail?.MinimumPurchaseAmount
      ? "Minimum"
      : "";

  let onteTimeSellAmountErr =
    formFileds.LiquidSellMinAmount <
      buyInvest?.schemesDetail?.RedemptionAmountMinimum
      ? "Minimum"
      : "";

  const {
    SIPMAXIMUMINSTALLMENTNUMBERS,
    SIPMINIMUMINSTALLMENTNUMBERS,
    SIPMINIMUMINSTALLMENTAMOUNT,
  } = peroidSipSchemeDetails;

  const {
    sipSelectPeriodOption,
    select_period,
    sipInstallmentAmount,
    sipDate,
    sipAmount,
    First_Order_Today,
    First_Order_Today_Err,
    oneTimePurChaseAmount,
    LiquidSellRadioBtn,
    LiquidSellDate,
    LiquidSellCheckbox,
    LiquidSellMinAmount,
  } = formFileds;

  // handleToHelpModalShow
  const handleToHelpModal = () => {
    setCreateMandateHelp(true);
    setCreateMandatePopup(false);
  };

  return (
    <>
      <div className="mb-4">
        <div className="invest-card-parent">
          <div className="invest-card-checkbox">
            <NormalCheckbox
              className="custom-checkbox"
              name={"sip"}
              onChange={(e) => handleChange(e, indexVal)}
              label={Labels.sip}
              checked={formFileds.sip}
              hightlightTextColor={formFileds.sip && "hightlightTextColor"}
            />
          </div>

          {formFileds.sip && (
            <div className="box">
              <div className="row">
                <div className="col-4 ">
                  <CommonSelect
                    placeholder={Labels.selectPeriod}
                    options={sipSelectPeriodOption}
                    name="select_period"
                    value={select_period}
                    onChange={(e) => handleChange(e, indexVal)}
                    label={Labels.selectPeriod}
                    disabled={formFileds.sip === false}
                    errorMessage={
                      errorFields?.select_period && error_allfiled_msg
                    }
                  />
                </div>

                <div className="col-4">
                  <CommonInput
                    type="number"
                    placeholder={Labels.noOfInstallments}
                    label={Labels.installment}
                    name="sipInstallmentAmount"
                    onChange={(e) => handleChange(e, indexVal)}
                    value={sipInstallmentAmount}
                    max={3}
                    disabled={select_period === "" && true}
                    errorMessage={
                      errorFields.sipInstallmentAmount &&
                      (SIPMINIMUMINSTALLMENTNUMBERS
                        ? sipInstallmentAmountErr === "Equal"
                          ? ""
                          : `${sipInstallmentAmountErr} Installment Amount is ${sipInstallmentAmountErr === "Maximum"
                            ? SIPMAXIMUMINSTALLMENTNUMBERS
                            : SIPMINIMUMINSTALLMENTNUMBERS
                          }
                    `
                        : error_allfiled_msg)
                    }
                  />
                </div>
                <div className="col-8">
                  <DatePicker
                    placeholder={Labels.installmentDate}
                    name="sipDate"
                    disabledDate={disableDateRanges}
                    value={sipDate}
                    onChange={(e) => handleChange(e, indexVal)}
                    disabled={select_period === "" && true}
                    errorMessage={errorFields?.sipDate && error_allfiled_msg}
                  />
                </div>
                <div className="col-8">
                  <CommonInput
                    sublabel={
                      SIPMINIMUMINSTALLMENTAMOUNT &&
                      `${Labels.minAmount}: ${Labels.rs}${SIPMINIMUMINSTALLMENTAMOUNT} `
                    }
                    type="number"
                    name="sipAmount"
                    max={9}
                    placeholder={Labels.amount}
                    onChange={(e) => handleChange(e, indexVal)}
                    value={sipAmount}
                    disabled={select_period === "" && true}
                    errorMessage={
                      errorFields?.sipAmount && errorFields?.sipErrorText === ""
                        ? error_allfiled_msg
                        : errorFields?.sipAmount &&
                          errorFields?.sipErrorText !== ""
                          ? errorFields?.sipErrorText
                          : ""
                    }
                    isSubTextRequired={true}
                  />
                </div>

                {sipAmount && (
                  <span className="notes">
                    {numToWords.toWords(sipAmount) + " Rupees only"}
                  </span>
                )}
                <div
                  className={`col-12 ${!SIPMINIMUMINSTALLMENTAMOUNT ? "mt-3" : ""
                    }`}
                >
                  <NormalCheckbox
                    className="custom-checkbox"
                    name={"First_Order_Today"}
                    value={First_Order_Today}
                    checked={First_Order_Today}
                    onChange={(e) => handleChange(e, indexVal)}
                    label={Labels.firstOrderToday}
                  />
                  {First_Order_Today_Err && (
                    <p className="text-danger">{error_first_order}</p>
                  )}
                </div>
              </div>
              <div className="mandate-details">
                <div className="mandate-title">
                  {Labels.installmentPayment}
                  <ToolTip
                    children={
                      <img
                        src={InfoIcon}
                        onClick={() => setMandateViewPopup(true)}
                        alt="invest"
                      />
                    }
                    label={Labels.info}
                  />

                  <div className="button-div">
                    <button
                      className="primary-btn green bordered create-mandate"
                      onClick={() => setCreateMandatePopup(true)}
                    >
                      {Labels.createMandate}
                    </button>
                  </div>
                </div>

                {buyMandateData?.objMandateList &&
                  buyMandateData?.objMandateList.length > 0 && (
                    <MandateListDropdown
                      defaultValue={buyMandateData?.objMandateList[0]}
                      formatOptionLabel={(item) => (
                        <MandateListDropdownCard item={item} />
                      )}
                      options={buyMandateData?.objMandateList}
                      value={formFileds.madateSingleList}
                      onChange={(e) => {
                        handleChange(e, indexVal, "selectList");
                      }}
                    />
                  )}
              </div>
            </div>
          )}
        </div>

        <div className="invest-card-parent">
          <div className="invest-card-checkbox">
            <NormalCheckbox
              type="checkbox"
              label={Labels.OneTime}
              name="oneTime"
              checked={formFileds.oneTime}
              onChange={(e) => handleChange(e, indexVal, "checkbox")}
            />
            {formFileds.oneTime && (
              <span
                className="cutoftime-title"
                onClick={() => setCutOfTimeModal(true)}
              >
                {Labels.cutoffTime}
              </span>
            )}
          </div>

          {formFileds.oneTime && (
            <div className="box">
              <div className="col-md-4">
                <CommonInput
                  sublabel={
                    buyInvest?.schemesDetail?.MinimumPurchaseAmount &&
                    `${Labels.minAmount}: ${Labels.rs}${buyInvest?.schemesDetail?.MinimumPurchaseAmount} `
                  }
                  type="number"
                  name="oneTimePurChaseAmount"
                  placeholder={Labels.amount}
                  max={9}
                  onChange={(e) => handleChange(e, indexVal)}
                  value={oneTimePurChaseAmount}
                  disabled={!formFileds.oneTime}
                  errorMessage={
                    errorFields.oneTimePurChaseAmount &&
                    `${oneTimePurChaseAmountErr} Installment Amount is 
                    ${buyInvest?.schemesDetail?.MinimumPurchaseAmount}
                    `
                  }
                  isSubTextRequired={true}
                />

                {<div>{errorFields.oneTimePurChaseAmount} </div>}
                {oneTimePurChaseAmount && (
                  <span className="notes">
                    {numToWords.toWords(oneTimePurChaseAmount) + " Rupees only"}
                  </span>
                )}
              </div>

              {buyInvest?.schemesDetail?.SchemeType?.includes(
                endpoints.liquid
              ) && (
                  <div className="oneTime-sellContainer">
                    <NormalCheckbox
                      className="custom-checkbox check-box"
                      name={"LiquidSellCheckbox"}
                      value={LiquidSellCheckbox}
                      checked={LiquidSellCheckbox}
                      onChange={(e) => handleChange(e, indexVal)}
                      label={Labels.sellEnable}
                    />

                    <div className="sellContainer-radio">
                      <div className="d-flex">
                        <NormalRadioButton
                          checked={LiquidSellRadioBtn === endpoints.allUnit}
                          onChange={(e) => {
                            handleChange(e, indexVal, "sellRadioBtn");
                          }}
                          label={Labels.allUnits}
                          name={endpoints.allUnit}
                          disabled={LiquidSellCheckbox === false}
                        />
                        <NormalRadioButton
                          checked={LiquidSellRadioBtn === endpoints.amount}
                          onChange={(e) => {
                            handleChange(e, indexVal, "sellRadioBtn");
                          }}
                          label={Labels.amount}
                          name={endpoints.amount}
                          disabled={LiquidSellCheckbox === false}
                        />
                      </div>
                      <div className="col-4">
                        <CommonInput
                          sublabel={
                            buyInvest?.schemesDetail?.RedemptionAmountMinimum &&
                            `${Labels.minAmount}: ${Labels.rs}${buyInvest?.schemesDetail?.RedemptionAmountMinimum} `
                          }
                          type="number"
                          name="LiquidSellMinAmount"
                          max={5}
                          placeholder={Labels.amount}
                          onChange={(e) => handleChange(e, indexVal)}
                          value={LiquidSellMinAmount}
                          disabled={
                            LiquidSellRadioBtn !== endpoints.amount ||
                            !LiquidSellCheckbox
                          }
                          errorMessage={
                            errorFields.LiquidSellMinAmount &&
                            `${onteTimeSellAmountErr} Installment Amount is 
                          ${onteTimeSellAmountErr === "Maximum"
                              ? buyInvest?.schemesDetail
                                ?.RedemptionAmountMaximum
                              : buyInvest?.schemesDetail
                                ?.RedemptionAmountMinimum
                            }
                          `
                          }
                          isSubTextRequired={true}
                        />

                        {LiquidSellMinAmount && (
                          <span className="notes">
                            {numToWords.toWords(LiquidSellMinAmount) +
                              " Rupees only"}
                          </span>
                        )}
                      </div>
                      <div className="col-4">
                        <DatePicker
                          placeholder={Labels.selectDate}
                          name="LiquidSellDate"
                          disabledDate={(current) => {
                            return moment().add(0, "days") >= current;
                          }}
                          value={LiquidSellDate}
                          onChange={(e) => handleChange(e, indexVal)}
                          disabled={LiquidSellCheckbox === false}
                          errorMessage={
                            errorFields?.LiquidSellDate && error_allfiled_msg
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {mandateView && (
        <MandatePopup
          setMandateViewPopup={setMandateViewPopup}
          mandateView={mandateView}
        />
      )}

      {cutOfTimeModal && (
        <CutOfTimeModal
          isVisible={cutOfTimeModal}
          setCutOfTimeViewPopup={setCutOfTimeModal}
        />
      )}

      {createmandateView && (
        <CreateMandate
          setCreateMandatePopup={setCreateMandatePopup}
          createmandateView={createmandateView}
          mandateData={formFileds}
          handleChange={handleChange}
          handleToHelpModal={handleToHelpModal}
        />
      )}

      {createMandateHelp && (
        <Popup isOpen={createMandateHelp} setPopup={setCreateMandateHelp}>
          <div className="popup-description">
            <iframe
              src={endpoints?.auth?.MANDATE_HELP}
              title="Help"
              style={{ width: "100%", height: 500 }}
            ></iframe>
          </div>
        </Popup>
      )}
    </>
  );
}

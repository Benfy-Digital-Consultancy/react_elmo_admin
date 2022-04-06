import React, { useState, useEffect } from "react";
import AddIcon from "assets/images/plus-circle.svg";
import minusIcon from "assets/images/minus-circle.png";
import { ToolTip } from "components/Common/ToolTip";
import { useLang } from "hooks/useLang";

const CardMainContent = (props) => {
  const {
    data,
    toggle,
    setToggle,
    orderDate,
    payOnline,
    chellanOption,
    smsOption,
    StepDetails,
    isMobile,
    numberToRupees,
    roleID,
    url,
  } = props;
  const { Labels } = useLang();
  const [stepperValue, setStepperValue] = useState(data?.ViewOrderStateWeb);
  const [orderStatus, setOrderStatus] = useState("");
  const [statusColor, setStatusColor] = useState(false);

  useEffect(() => {
    for (let i = 0; i <= data?.ViewOrderStateWeb?.length; i++) {
      if (
        data?.ViewOrderStateWeb[0]?.OrderStateID >
          data?.ViewOrderStateWeb[1]?.OrderStateID &&
        data?.ViewOrderStateWeb[1]?.OrderStateID <
          data?.ViewOrderStateWeb[0]?.OrderStateID
      ) {
        data?.ViewOrderStateWeb.reverse().forEach(() => {
          setStepperValue([...data?.ViewOrderStateWeb]);
        });
      }
    }
  }, [data?.ViewOrderStateWeb, stepperValue]);

  useEffect(() => {
    for (let i = 0; i < stepperValue?.length; i++) {
      if (stepperValue[i]?.OrderStateValue === 2) {
        setOrderStatus(stepperValue[i]?.BSEOrderRemarks);
        setStatusColor(true);
        return null;
      } else if (stepperValue[i]?.OrderStateValue === 1) {
        setOrderStatus(stepperValue[i]?.OrderStateName);
      }
    }
  }, [stepperValue]);

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="row">
          <div className="box-title">
            <strong>{data?.SchemeName}</strong>
            <span>
              {Labels.folioNumber} : {data?.Folio_Number}
            </span>
            <div className="right d-flex align-items-center">
              <div>
                <span className={`${statusColor === true ? "red-color" : ""}`}>
                  {orderStatus}
                </span>
              </div>
              <ToolTip
                children={
                  <img
                    alt="plusMinus"
                    src={toggle === true ? minusIcon : AddIcon}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  />
                }
                label={!toggle ? Labels.expand : Labels.collapse}
              />
            </div>
          </div>
          <div className="box-subtitle">
            <span>
              {data?.Client_Name}({data?.Client_Code})
            </span>
            <span>
              {Labels.orderNumber} : {data?.Order_number}
            </span>
          </div>
          <div className="box-content">
            <div className="left">
              <div className="list-outer w-100 col-2">
                <div className="list">
                  <div className="label">{Labels.orderDate} : </div>
                  <div className="value">{orderDate}</div>
                </div>
                <div className="list">
                  <div className="label">{Labels.amount} : </div>
                  <div className="value">{numberToRupees(data?.Amount)}</div>
                </div>
                <div className="list">
                  <div className="label">{Labels.orderType} :</div>
                  <div className="value">{data?.OrderType}</div>
                </div>
                <div className="list">
                  <div className="label">{Labels.unit} : </div>
                  <div className="value">
                    {data?.UNIT === "" ? "-" : `# ${data?.UNIT}`}
                  </div>
                </div>
              </div>
            </div>
            <div className="status-container">
              <div className="bottom-div">
                <div>
                  <span>{Labels.status} : </span>
                  {data?.PaymentStatus.split(" ")[0]}
                  {" - "}
                  <span className="grey-color">{data?.PaymentStatus}</span>
                </div>
              </div>
              <div className="right">
                {url !== "" ? (
                  <>
                    <button
                      onClick={payOnline}
                      className="primary-btn bg-trans"
                    >
                      <span>{Labels.payOnline}</span>
                    </button>
                    <button
                      onClick={chellanOption}
                      className="primary-btn bg-trans"
                    >
                      <span>{Labels.payCheque}</span>
                    </button>
                    {roleID !== 5 ? (
                      <button
                        onClick={smsOption}
                        className="primary-btn bg-trans"
                      >
                        <ToolTip
                          children={Labels.sms}
                          label={Labels.paymentLink}
                        />
                      </button>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {toggle && (
            <div className="col-md-12 bg-c6 order-status-stepper py-4 grey-bg">
              <div className="d-flex justify-content-between">
                <h6 className="fw-600 pb-4">{Labels.orderStatus} </h6>
              </div>
              <StepDetails isMobile={isMobile} stepperValue={stepperValue} />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardMainContent;

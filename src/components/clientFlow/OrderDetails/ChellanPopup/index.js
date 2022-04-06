import React from "react";
import ErrorComponent from "components/Common/ErrorComponent";
import { CommonSelect } from "components/Common/CommonSelect";
import { CommonInput } from "components/Common/CommonInput";
import { DatePicker } from "components/Common/DatePicker";
import { NormalCheckbox } from "components/Common";
import Popup from "components/Common/Popup/Popup";
import { useLang } from "hooks/useLang";

const ChellanPopup = (props) => {
  const {
    chellanDetailPopup,
    setChellanDetailPopup,
    chellanDetailsList,
    orderChange,
    chellanByID,
    handleBank,
    handleChange,
    bankDetails,
    primaryAcc,
    amount,
    formDetails,
    generateChellanOption,
    pdfPopup,
    setPdfPopup,
    pdfPath,
    error,
    showBankDetails,
    setShowBankDetails,
    continueOption,
    selectedCheckBoxes,
  } = props;

  const { Labels } = useLang();
  return (
    <React.Fragment>
      {chellanDetailPopup && (
        <Popup isOpen={chellanDetailPopup} setPopup={setChellanDetailPopup}>
          <div className="chellan-popup">
            <div className="inner-tab-content">
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <th align="left"></th>
                    <th align="center">{Labels.orderNo}</th>
                    <th align="center">{Labels.schemeName}</th>
                    <th align="right">{Labels.amount}</th>
                  </tr>
                  <tr>
                    <th className="empty-space" colSpan="5"></th>
                  </tr>
                  {chellanDetailsList?.length > 0 ||
                  chellanDetailsList !== null ? (
                    chellanDetailsList?.map((item, index) => (
                      <tr key={index}>
                        <td align="center">
                          {item?.GroupId === "" ? (
                            <NormalCheckbox
                              className="custom-checkbox"
                              id={item}
                              value={item}
                              onChange={(e) => orderChange(item, e, index)}
                            />
                          ) : (
                            <button
                              onClick={() => chellanByID(item)}
                              className="primary-btn bordered bottom-align"
                            >
                              {Labels.generate}
                            </button>
                          )}
                        </td>
                        <td align="left">{item.orderNo}</td>
                        <td align="left">{item.SchemeName}</td>
                        <td align="right">{item.Amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="not-found">
                        {Labels.noDataFound}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {selectedCheckBoxes?.length > 0 ? (
                <button className="primary-btn" onClick={continueOption}>
                  {Labels.continue}
                </button>
              ) : null}
            </div>
            {showBankDetails && (
              <div className="card-popup">
                <div className="row">
                  <div className="col-md-6">
                    <CommonSelect
                      placeholder={Labels.selectBank}
                      options={bankDetails}
                      name="bankDetails"
                      value={primaryAcc?.Bank}
                      label={Labels.depositBank}
                      onChange={(e) => handleBank(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CommonInput
                      label={Labels.accountNo}
                      defaultValue={primaryAcc?.Account_No}
                      value={primaryAcc?.Account_No}
                      readOnly={true}
                    />
                  </div>
                </div>
                <h3>Cheque Details:</h3>
                <div className="row">
                  <div className="col-4">
                    <CommonInput
                      label={Labels.amount}
                      name="amount"
                      value={amount !== null ? amount : null}
                      readOnly={true}
                    />
                  </div>
                  <div className="col-4">
                    <CommonInput
                      label={Labels.chequeNumber}
                      type="number"
                      name="chequeNumber"
                      value={formDetails?.chequeNumber}
                      onChange={handleChange}
                    />
                    {error.chequeNumber && (
                      <ErrorComponent message={error.chequeNumber[0]} />
                    )}
                  </div>
                  <div className="col-4">
                    <DatePicker
                      label={Labels.date}
                      name="date"
                      value={formDetails?.date}
                      dateFormat="dd/MM/yyyy"
                      onChange={handleChange}
                      placeholderText={Labels.date}
                      selected={formDetails?.date}
                      shouldCloseOnSelect={true}
                      customClass="w-100"
                    />
                    {error.date && <ErrorComponent message={error.date[0]} />}
                  </div>
                </div>
                <div className="button-section">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      setChellanDetailPopup(false);
                      setShowBankDetails(false);
                    }}
                  >
                    {Labels.close}
                  </button>
                  <button
                    className="primary-btn bordered bottom-align"
                    onClick={generateChellanOption}
                  >
                    {Labels.generate} {Labels.challan}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Popup>
      )}
      {pdfPopup && (
        <Popup
          isOpen={pdfPopup}
          setPopup={(value) => {
            setPdfPopup(value);
          }}
        >
          <iframe
            src={pdfPath}
            title="Document"
            style={{ width: "100%", height: 500 }}
          />
        </Popup>
      )}
    </React.Fragment>
  );
};

export default ChellanPopup;

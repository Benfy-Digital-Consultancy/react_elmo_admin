import React from "react";
import { NormalRadioButton } from "../NormalRadioButton";
import { CommonInput } from "../CommonInput";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";

const numToWords = require("number-to-words");

export const OneTime = ({
  disabled = false,
  details,
  handleChangeRadio,
  errors,
  minAmountOneTime,
  handleChange,
  SchemesDetail,
  isSwitch = false,
}) => {
  const { Labels } = useLang();
  //handle Num To Words
  const handleNumToWords = () => {
    if (details.OneTimeRadioBtn === endpoints.amount) {
      return numToWords.toWords(details.Amount) + " Rupees only";
    } else {
      return (
        details.Amount +
        " Units of " +
        numToWords.toWords(details.Amount * SchemesDetail.NAV) +
        " Rupees only"
      );
    }
  };

  const disabledKey =
    (details.OneTimeRadioBtn === endpoints.amount &&
      details.Amount.length === 12) ||
    (details.OneTimeRadioBtn === endpoints.unit && details.Amount.length === 8);

  return (
    <div
      className={
        (!isSwitch ? "px-5 pt-5 " : "pt-3") + (disabled ? "disabled" : "")
      }
    >
      <div
        className={
          "text-center d-flex justify-content-center " +
          (!isSwitch ? "pb-4 mb-2" : "pb-2")
        }
      >
        <NormalRadioButton
          disabled={disabled}
          checked={details.OneTimeRadioBtn === endpoints.amount}
          onChange={(e) => handleChangeRadio(e, "OneTimeRadioBtn")}
          label={Labels.amount}
          name={endpoints.amount}
        />
        <NormalRadioButton
          disabled={disabled}
          checked={details.OneTimeRadioBtn === endpoints.unit}
          onChange={(e) => handleChangeRadio(e, "OneTimeRadioBtn")}
          label={Labels.unit}
          name={endpoints.unit}
        />
        <NormalRadioButton
          disabled={disabled}
          checked={details.OneTimeRadioBtn === endpoints.allUnits}
          onChange={(e) => handleChangeRadio(e, "OneTimeRadioBtn")}
          label={Labels.allUnits}
          name={endpoints.allUnits}
        />
      </div>

      <div className="row">
        <div className="col-12">
          <CommonInput
            sublabel={`${Labels.minAmount}: ${Labels.rs} ${minAmountOneTime}`}
            type="number"
            disabled={
              details.OneTimeRadioBtn === endpoints.allUnits ||
              disabled ||
              disabledKey
            }
            name={endpoints.amount}
            onChange={handleChange}
            value={details.Amount}
            isSubTextRequired={
              details.OneTimeRadioBtn === endpoints.amount ? true : false
            }
            errorMessage={errors.Amount || null}
          />
          {disabledKey && (
            <div className="d-flex">
              <span
                className="ms-auto cursor-pointer mb-2"
                style={{ marginTop: "-6px" }}
                onClick={() => {
                  let body = {
                    target: { name: endpoints.amount, value: "" },
                  };
                  handleChange(body);
                }}
              >
                {Labels.clear}
              </span>
            </div>
          )}
          {details.Amount && (
            <span className="notes">{handleNumToWords()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

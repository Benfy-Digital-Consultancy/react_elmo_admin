import React, { useState, useEffect } from "react";
import { Steps, Popover } from "antd";
import { EmptyRecord } from "components/Common/EmptyRecord";

const StepDetails = ({ isMobile, stepperValue }) => {
  const { Step } = Steps;
  const customDot = (dot) => <Popover>{dot}</Popover>;
  const [header, setHeader] = useState([]);

  useEffect(() => {
    const header_data = [];
    for (let i = 0; i < stepperValue?.length; i++) {
      const header_list = stepperValue[i]?.OrderStateName;
      header_data.push({ header_list });
    }
    setHeader(header_data);
  }, [stepperValue]);

  return (
    <React.Fragment>
      {header?.length > 0 ? (
        <div className="step-details row">
          <div className="col-lg-7 col-sm-12 w-100">
            <Steps
              current={stepperValue?.length}
              progressDot={customDot}
              direction={`${isMobile ? "vertical" : "horizontal"}`}
            >
              {header?.map((item, index) => {
                return (
                  <Step
                    key={index}
                    description={item?.header_list}
                    title={
                      stepperValue?.length >= index
                        ? stepperValue[index]?.OrderStateDate
                        : null
                    }
                    subTitle={stepperValue[index]?.BSEOrderRemarks}
                    status={
                      index === 0
                        ? "process"
                        : ((stepperValue[index]?.OrderStateValue === 0 ||
                            stepperValue[index]?.OrderStateValue ===
                              undefined) &&
                            "wait") ||
                          (stepperValue[index]?.OrderStateValue === 1 &&
                            "process") ||
                          (stepperValue[index]?.OrderStateValue === 2 &&
                            "error")
                    }
                  />
                );
              })}
            </Steps>
          </div>
        </div>
      ) : (
        <EmptyRecord />
      )}
    </React.Fragment>
  );
};

export default StepDetails;

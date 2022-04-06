import { MandateListDropdown } from "components/Common/MandateListDropdown";
import { MandateListDropdownCard } from "components/Common/MandateListDropdownCard";
import React, { useCallback, useEffect, useState } from "react";
import { getDataFromStorage } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { GetClientMandateList } from "redux/action/clientFlow/BuyInvestAct";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const MandateSection = ({
  handleChangeMandate,
  mandateValue,
  GetClientMandateListApiCall,
  setMandateValue,
}) => {
  const [buyMandateData, setBuyMandateData] = useState([]);

  const getClientMandaeFn = useCallback(
    (ClientCode) => {
      let query = {
        Client_Code: ClientCode,
      };
      GetClientMandateListApiCall(query).then((data) => {
        setBuyMandateData(data);
        setMandateValue(data?.objMandateList[0]);
      });
    },

    [GetClientMandateListApiCall]
  );

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    if (userRoleData) {
      let { ClientCode } = userRoleData;
      getClientMandaeFn(ClientCode);
    }
  }, [getClientMandaeFn]);
  console.log(buyMandateData, "buyMandateDatabuyMandateData");
  return (
    <>
      {buyMandateData?.objMandateList &&
        buyMandateData?.objMandateList.length > 0 && (
          <MandateListDropdown
            defaultValue={buyMandateData?.objMandateList[0]}
            formatOptionLabel={(item) => (
              <MandateListDropdownCard item={item} />
            )}
            options={buyMandateData?.objMandateList}
            value={mandateValue}
            onChange={handleChangeMandate}
          />
        )}
    </>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetClientMandateListApiCall: GetClientMandateList,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(MandateSection);

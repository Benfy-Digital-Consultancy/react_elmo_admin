import React, { useState, useEffect, useRef, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Multiselect from "multiselect-react-dropdown";
import "./style.scss";
import {
  getSipDetails,
  GetFamilyHeadClientList,
} from "redux/action/clientFlow/Sip";
import { saveCallLog } from "redux/action/clientFlow/SellAct";
import Pagination from "components/Common/Pagination/Pagination";
import ActiveCard from "./ActiveCard";
import PauseSIPModal from "components/Common/PauseSIPModal";
import TabList from "./TabList";
import SearchInput from "components/Common/SearchInput";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { getDataFromStorage } from "service/helperFunctions";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { PageLoader } from "components/Common/PageLoader";
function Sip(props) {
  const { Labels, errorText } = useLang();
  const [activeTab, setActiveTab] = useState();
  const [pauseModal, setPauseModal] = useState(false);
  const [sipFilterList, setSipFilterList] = useState({});
  const [sipOriginalList, setSipOriginalList] = useState({});
  const [code, setCode] = useState("");
  const [selItem, setSelItem] = useState(null);
  const [period, setPeriod] = useState("");
  const [pauseSingleData, setPauseSingleData] = useState({});
  const [resPopup, setResPopup] = useState(false);
  const [response, setResponse] = useState("");
  const [tabList, setTabList] = useState([]);
  const [cancelModalHide, setCancelModalHide] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(endpoints?.auth?.pageLimit);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchMultiSelect, setSearchMultiSelect] = useState([]);
  const [searchListTitle, setSearchListTitle] = useState([]);
  const [searchMultiValue] = useState("");
  const MulitiSelectRef = useRef(null);
  const [familyNameAuth, setFamilyNameAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupModalErrMsg, setPopupModalErrMsg] = useState("");

  const { getSipDetailsApiCall, GetFamilyApiCall, sipUpdatePauseApiCall } =
    props;

  //SipApiFunction
  const sipApiFunction = useCallback(() => {
    const {
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      WHITELIST_SOURCE_KEY,
      WHITELIST_SOURCE_DATA,
    } = endpoints.auth;
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);

    let source = getDataFromStorage(
      WHITELIST_SOURCE_DATA,
      WHITELIST_SOURCE_KEY
    );
    if (userRoleData) {
      setLoading(true);
      let payload = {
        CustomCode: userRoleData?.ClientCode || "30900",
        FromDate: "",
        ToDate: "",
        userRequest: {
          UID: userRoleData?.uid,
          LoggedInRoleId: userRoleData?.role_id,
          IPAddress: sessionStorage.getItem(endpoints.auth.IP),
          Source: source,
          AppOrWeb: endpoints.auth.WEB,
          deviceInfo: endpoints.auth.APIDEVICEINFO,
        },
      };

      getSipDetailsApiCall(payload)
        .then((data) => {
          setSipOriginalList(data?.ObjectResponse);
          setSipFilterList(data?.ObjectResponse);
          let tab = Object.keys(data?.ObjectResponse);
          setTabList(tab);
          setActiveTab(tab[0]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [getSipDetailsApiCall]);

  useEffect(() => {
    sipApiFunction();
  }, [sipApiFunction]);

  const GetFamilyClientList = useCallback(
    (familyHeaderCode) => {
      let payload = {
        FamilyHeadCode: familyHeaderCode,
      };
      GetFamilyApiCall(payload).then((data) => {
        if (data?.DataObject?.length > 1) {
          setSearchMultiSelect(data?.DataObject);
        } else {
          setFamilyNameAuth("false");
        }
      });
    },
    [GetFamilyApiCall]
  );

  useEffect(() => {
    const {
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      FAMILY_DROPDOWN_FLAG,
      FAMILY_DROPDOWN_KEY,
    } = endpoints.auth;
    let familyDropdownStatus = getDataFromStorage(
      FAMILY_DROPDOWN_FLAG,
      FAMILY_DROPDOWN_KEY
    );

    setFamilyNameAuth(familyDropdownStatus);
    if (familyDropdownStatus === "true") {
      let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
      if (userRoleData) {
        let familyHeaderCode = userRoleData?.ClientCode;
        GetFamilyClientList(familyHeaderCode);
      }
    }
  }, [GetFamilyClientList]);

  // Hide and Show Pause Modal
  const hidePauseModal = () => {
    setPauseModal(false);
    setResPopup(false);
    setSelItem(null);
    setCancelModalHide(false);
    setPeriod("");

    if (resPopup) {
      sipApiFunction();
      setSearchListTitle([]);
    }
  };

  const showPauseModal = (item) => {
    setPauseModal(true);
    setPauseSingleData(item);
  };

  // handleChangeRadio
  const handleClickRadio = (item) => {
    setPopupModalErrMsg(false);
    item === selItem ? setSelItem(null) : setSelItem(item);
    var newItem = item.includes(endpoints.stop);
    if (newItem === true) {
      setCode(140);
    } else {
      setCode(77);
    }
    var newPeriod = item.replace(endpoints.stop, "").split(" ").join("");
    setPeriod(newPeriod);
  };

  // pauseSIP

  const pauseSIP = () => {
    const { error_message } = errorText?.pausesip_error_message || {};
    if (period === "") {
      setPopupModalErrMsg(error_message);
      return null;
    }

    const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    if (userRoleData) {
      let CustomCode = userRoleData.ClientCode;
      let LoggedInRoleId = userRoleData.role_id;
      let tab =
        pauseSingleData?.Folio +
        "#" +
        period +
        "#" +
        pauseSingleData?.SchemeName +
        "#" +
        pauseSingleData?.ClientCode +
        "#" +
        pauseSingleData?.clientName +
        "#" +
        pauseSingleData?.SIPRegNo;

      let body = {
        Type: "Client",
        Code: CustomCode,
        ModeId: "1",
        CallTypeId: "15",
        SubTypeId: code,
        LogTypeId: "1",
        AssignedToRole: LoggedInRoleId,
        Status: "1",
        Description: tab,
      };
      sipUpdatePauseApiCall(body).then((data) => {
        setResponse(data?.ObjectResponse?.Result);
        setResPopup(true);
      });
    }
  };

  // Modal Content
  const content = (item) => {
    return (
      <div id="sip-popover-content">
        <p
          className="title border-bottom"
          onClick={() => {
            showPauseModal(item);
            setCancelModalHide(true);
          }}
        >
          {Labels.pauseSip}
        </p>
        <p
          className="title"
          onClick={() => {
            showPauseModal(item);
            setCancelModalHide(false);
          }}
        >
          {Labels.cancelSip}
        </p>
      </div>
    );
  };

  // cancelContent
  const cancelContent = (item) => {
    return (
      <div id="sip-popover-content">
        <p
          className="title"
          onClick={() => {
            showPauseModal(item);
            setCancelModalHide(false);
          }}
        >
          {Labels.cancelSip}
        </p>
      </div>
    );
  };

  // handleToSearch
  const searchHandler = (key) => {
    setSearchInputValue(key);
    const searchFilteredData = sipOriginalList[activeTab].filter(
      ({ SchemeName, Folio }) => {
        return (
          SchemeName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          Folio.toLowerCase().indexOf(key.toLowerCase()) !== -1
        );
      }
    );

    var filterUpdateObject = {
      ...sipOriginalList,
      [activeTab]: searchFilteredData,
    };
    setSipFilterList(filterUpdateObject);
  };

  // handleToActiveTabSet

  const handleToActiveTab = (item) => {
    setActiveTab(item);
    setPage(1);
    setPageCount(endpoints?.auth?.pageLimit);
    setSearchInputValue("");
    setSipFilterList(sipOriginalList);
    setSearchListTitle([]);

    if (familyNameAuth === "true") {
      MulitiSelectRef.current.resetSelectedValues();
    }
  };

  // handleMultiSelectValue
  const onSelect = (selectedList) => {
    setPage(1);
    setPageCount(endpoints?.auth?.pageLimit);
    mulitSelectDropdownFilter(selectedList);
    setSearchListTitle(selectedList);
    setTimeout(() => {
      const element = document.getElementsByClassName("chip");
      const elementLength = element ? element.length : null;
      if (elementLength && elementLength > 2) {
        const docElement =
          document.getElementsByClassName("chip")[elementLength - 1];
        docElement && (docElement.style.display = "none");
      }
    }, 100);
  };
  const onRemove = (selectedList) => {
    setPage(1);
    setPageCount(endpoints?.auth?.pageLimit);
    mulitSelectDropdownFilter(selectedList);

    setSearchListTitle(selectedList);

    setTimeout(() => {
      const element = document.getElementsByClassName("chip");
      const elementLength = element ? element.length : null;
      if (elementLength && elementLength > 2) {
        const docElement1 = document.getElementsByClassName("chip")[0];
        docElement1 && (docElement1.style.display = "inline-flex");
        const docElement2 = document.getElementsByClassName("chip")[1];
        docElement2 && (docElement2.style.display = "inline-flex");
      }
    }, 100);
  };

  const mulitSelectDropdownFilter = (selectedList) => {
    if (selectedList.length === 0) {
      setSipFilterList(sipOriginalList);
    } else {
      const filterResult = sipOriginalList[activeTab].filter((o1) => {
        return selectedList.some((o2) => {
          return o1.clientName === o2.client_name.trim();
        });
      });

      var filterUpdateObject = {
        ...sipOriginalList,
        [activeTab]: filterResult,
      };
      setSipFilterList(filterUpdateObject);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="sip-details">
      {familyNameAuth === "true" ? (
        <div className="sip-multidropdown">
          <div className="col-md-4 factsheet-multiselectdropdown factsheet-w100">
            <Multiselect
              options={searchMultiSelect}
              selectedValues={searchMultiValue}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="client_name"
              showCheckbox={true}
              ref={MulitiSelectRef}
              placeholder={Labels.selectFamily}
              closeIcon={true}
            />
          </div>
        </div>
      ) : (
        <SearchInput
          placeholder={Labels.searchFamily}
          value={searchInputValue}
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
      )}

      <div className="sip-search-list-container">
        {searchListTitle && searchListTitle?.length > 0 && (
          <div>
            <span>{Labels.searchBy}: </span>
            {searchListTitle?.map((item, id) => {
              return (
                <React.Fragment key={id}>
                  <span className="sip-search-hightlight">
                    {item.client_name}{" "}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      <div className="page-content">
        <TabList
          tabList={tabList}
          sipFilterList={sipFilterList}
          handleToActiveTab={(item) => handleToActiveTab(item)}
          activeTab={activeTab}
        />

        <div className="tab-content">
          <div className="box-outer">
            {sipFilterList[activeTab] &&
            sipFilterList[activeTab]?.length > 0 ? (
              <div>
                {sipFilterList[activeTab]?.map((item, index) => {
                  return (
                    page * pageCount >= index + 1 &&
                    (page - 1) * pageCount < index + 1 && (
                      <ActiveCard
                        key={index}
                        ClassNameCard={
                          activeTab === endpoints.activeSIP
                            ? endpoints.activeClass
                            : activeTab === endpoints.provisionalSIP
                            ? endpoints.provisionalClass
                            : activeTab === endpoints.terminiated
                            ? endpoints.terminiatedClass
                            : activeTab === endpoints.paused
                            ? endpoints.pausedClass
                            : endpoints.suspendedClass
                        }
                        item={item}
                        content={
                          activeTab === endpoints.paused ||
                          activeTab === endpoints.suspended
                            ? cancelContent(item)
                            : item?.PauseSIP === true
                            ? content(item)
                            : cancelContent(item)
                        }
                      />
                    )
                  );
                })}
              </div>
            ) : (
              <EmptyRecord />
            )}
          </div>
        </div>
      </div>

      <div className="right" id="pause-popup-modal">
        {pauseModal && (
          <PauseSIPModal
            isOpen={pauseModal}
            setPopup={hidePauseModal}
            resPopupStatus={resPopup}
            pauseSIPTitle={cancelModalHide}
            onChange={(active) => handleClickRadio(active)}
            pauseConfirmSIP={() => pauseSIP()}
            popupModalErrMsg={popupModalErrMsg}
            responseStatus={response}
          />
        )}

        <div className="sip-pagination-container">
          {sipFilterList[activeTab] && sipFilterList[activeTab].length > 0 && (
            <Pagination
              pageNumber={page}
              pageChange={setPage}
              handlePageSize={(limit) => {
                setPageCount(limit);
                setPage(1);
              }}
              pageSize={pageCount}
              totalPages={sipFilterList[activeTab].length / pageCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSipDetailsApiCall: getSipDetails,
      sipUpdatePauseApiCall: saveCallLog,
      GetFamilyApiCall: GetFamilyHeadClientList,
    },
    dispatch
  );
};

let component = Sip;

export const SipComp = connect(null, mapDispatchToProps)(withRouter(component));

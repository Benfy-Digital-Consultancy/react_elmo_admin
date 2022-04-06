import React, { useCallback, useEffect, useState } from "react";
import MailIcon from "assets/images/mail-blue.svg";
import Copy from "assets/images/copy.svg";
import PrinterIcon from "assets/images/printer.svg";
import CloseIcon from "assets/images/x-circle.svg";
import Upload from "assets/images/upload.png";
import Success from "assets/images/success.png";
import Trash from "assets/images/trash.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchInput from "components/Common/SearchInput";
import { Tooltip } from "antd";
import CreateMandate from "components/clientFlow/clientBuyInvestment/CreateMandate";
import {
  GetClientMandateList,
  MandateFileUpload,
  MandateFileEmail,
  GetEMandateAuthURL,
  DeleteMandate,
} from "redux/action/clientFlow/BuyInvestAct";
import {
  amountWithRs,
  getDataFromStorage,
  date,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { PageLoader } from "components/Common/PageLoader";
import { EmptyRecord } from "components/Common/EmptyRecord";
import Pagination from "components/Common/Pagination/Pagination";
import { NormalButton } from "components/Common";
import { Toast } from "service/toast";
import Popup from "components/Common/Popup/Popup";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLang } from "hooks/useLang";
import MandateInfoPopup from "../clientBuyInvestment/MandateInfoPopup";
import "./style.scss";

const BankMandate = ({
  GetClientMandateListApiCall,
  MandateFileUploadApiCall,
  MandateFileEmailApiCall,
  GetEMandateAuthURLApiCall,
  DeleteMandateApiCall,
}) => {
  let [createmandateView, setCreateMandatePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModel, setIsModel] = useState(false);
  const [isCopyModel, setIsCopyModel] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [btnloader, setBtnLoader] = useState(false);
  let [mandateView, setMandateViewPopup] = useState(false);
  const [isMandateId, setIsMandateId] = useState("");
  const [isCopiedValue, setIsCopiedValue] = useState("");
  const [buyMandateData, setBuyMandateData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isModelList, setIsModelList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [formDetails, setFormDetails] = useState({});
  const { Labels } = useLang();
  const { error_title, success_title } = endpoints.response_error_msg;
  const { fileUpload } = endpoints.mandate;

  const userRoleData = getDataFromStorage(
    endpoints.auth.USER_ROLE_kEY,
    endpoints.auth.USER_ROLE_DATA
  );

  const getClientMandaeFn = useCallback(
    (ClientCode) => {
      let query = {
        Client_Code: ClientCode,
      };
      GetClientMandateListApiCall(query).then((data) => {
        setBuyMandateData(data?.objMandateList);
        setFilteredList(data?.objMandateList);
        setLoading(false);
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

  //SEARCH HELPER FN
  const searchHelperFn = (val, key) => {
    return val
      .replace(/\s+/g, "")
      .toLowerCase()
      .includes(key.replace(/\s+/g, "").toLowerCase());
  };
  //SEARCH HANDLER
  const searchHandler = (key) => {
    setSearch(key);
    const searchFilteredData = buyMandateData.filter(
      ({ BANK, MandateId, Mandate_Type_Name, Created_date }) => {
        return (
          MandateId.indexOf(parseInt(key)) !== -1 ||
          searchHelperFn(MandateId, key) ||
          searchHelperFn(BANK, key) ||
          searchHelperFn(Mandate_Type_Name, key) ||
          searchHelperFn(date(Created_date), key)
        );
      }
    );
    setFilteredList(searchFilteredData);
  };

  const handleFileUpload = (e, mandateName, mandateId) => {
    e.preventDefault();
    let fieldNameFile = mandateId.concat(mandateName);
    let fieldNameImage = mandateName.concat(mandateId);
    let reader = new FileReader();
    let file = e.target.files[0];
    let image_as_files = e.target.files[0];
    reader.onloadend = () => {
      let isFileList = [];
      isFileList.push(reader.result);
      setFormDetails((prevState) => ({
        ...prevState,
        [fieldNameFile]: image_as_files,
        [fieldNameImage]: isFileList,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (mandateName, mandateId, Client_Code) => {
    let fieldNameFile = mandateId.concat(mandateName);
    if (formDetails[mandateName.concat(mandateId)]) {
      setBtnLoader(true);
      Object.entries(formDetails).map(([key, value]) => {
        if (fieldNameFile === key) {
          const formData = new FormData();
          formData.append("Files0", value);
          formData.append("MandateId", mandateId);
          formData.append("ClientCode", Client_Code);
          formData.append("FileUploadedBy", userRoleData?.role_id);
          MandateFileUploadApiCall(formData).then((data) => {
            setBtnLoader(false);
            setIsModelList([success_title, data.message]);
            setIsModel(true);
            window.location.reload();
          });
        }
        return "";
      });
    } else {
      Toast({ type: error_title, message: fileUpload });
    }
  };

  const handleMail = (MandateId, Client_Code) => {
    let sub_broker_code = userRoleData?.SubBroker_Code;
    let body = {
      MandateId,
      ClientCode: Client_Code,
      SubBrokerCode: sub_broker_code,
    };
    MandateFileEmailApiCall(body).then((data) => {
      setIsModelList([success_title, data.message]);
      setIsModel(true);
    });
  };
  const handleCopied = (MandateId) => {
    setIsCopyModel(true);
    setIsCopiedValue(MandateId);
  };
  const handleAuthorize = (MandateId) => {
    let body = {
      Client_code: userRoleData?.ClientCode,
      BSEMandateId: MandateId,
    };
    GetEMandateAuthURLApiCall(body).then(({ response }) => {
      Toast({ type: error_title, message: response?.message });
    });
  };

  const handleDelete = () => {
    let body = {
      MandateId: isMandateId,
      ClientCode: userRoleData?.ClientCode,
      DeletedBy: userRoleData?.role_id,
      LanguageId: userRoleData?.role_id,
    };
    DeleteMandateApiCall(body).then((data) => {
      setIsDeleteModel(false);
      window.location.reload();
    });
  };
  if (loading) {
    return <PageLoader />;
  }

  let size = Object.keys(formDetails).length;

  return (
    <div className="all-mandate-page">
      <div className="top-section">
        <div className="d-flex justify-content-between">
          <div>
            <SearchInput
              placeholder={Labels.mandatePlaceholder}
              value={search}
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="right">
          <span
            className="help cursor-pointer"
            onClick={() => setMandateViewPopup(true)}
          >
            {Labels.help}
          </span>
          <span
            className="primary-btn bordered green bank-btn cursor-pointer"
            onClick={() => setCreateMandatePopup(true)}
          >
            {Labels.createMandate}
          </span>
        </div>
      </div>
      <div className="mandate-list-section">
        {filteredList?.length > 0 ? (
          <>
            {filteredList?.map(
              (
                {
                  Mandate_Type_Name,
                  Mandate_Type,
                  MandateId,
                  Amount,
                  Created_date,
                  Status,
                  BANK,
                  Account_Number,
                  IFSC_code,
                  UploadedFileName,
                  Client_Code,
                  Created_By,
                  FileURL,
                },
                index
              ) =>
                page * pageCount >= index + 1 &&
                (page - 1) * pageCount < index + 1 && (
                  <div className="list" key={index}>
                    <div className="list-left-section">
                      <div className="left">
                        <div className="current-list">
                          <div className="label">{Labels.mandateType} :</div>
                          <div className="value">{Mandate_Type_Name}</div>
                        </div>
                        <div className="current-list">
                          <div className="label">
                            {Mandate_Type === endpoints.Mandate_Type_key
                              ? endpoints.UMRN
                              : endpoints.Mandate_Id}
                            :
                          </div>
                          <div className="value">{MandateId}</div>
                        </div>
                        <div className="current-list">
                          <div className="label">{Labels.mandateAmount} :</div>
                          <div className="value"> {amountWithRs(Amount)}</div>
                        </div>
                        <div className="current-list">
                          <div className="label">{Labels.mandateDate} :</div>
                          <div className="value">{date(Created_date)}</div>
                        </div>
                      </div>
                      <div className="right">
                        <div className="current-list">
                          <div className="label">{Labels.status} :</div>
                          <div className="value">{Status}</div>
                        </div>
                        <div className="current-list">
                          <div className="label">{Labels.bankLabel} :</div>
                          <div className="value">{BANK}</div>
                        </div>
                        <div className="current-list">
                          <div className="label">{Labels.AccountNumber}:</div>
                          <div className="value">{Account_Number}</div>
                        </div>
                        <div className="current-list">
                          <div className="label">{Labels.IFSC} :</div>
                          <div className="value">{IFSC_code}</div>
                        </div>
                      </div>
                    </div>
                    <div className="list-right-section">
                      {Status === endpoints.mandateRegister &&
                        Mandate_Type_Name === endpoints.mandatePhysical && (
                          <Tooltip
                            className="mandate-tooltip"
                            placement={Labels.bottom}
                            title={
                              <span style={{ color: "#F49D37" }}>
                                {Labels.mandateFile}
                              </span>
                            }
                            color="#FFEFDC"
                          >
                            <div className="icon-tooltip upload">
                              <img alt="" src={Upload} />
                              <input
                                className="upload-file"
                                type="file"
                                onChange={(e) => {
                                  handleFileUpload(
                                    e,
                                    Mandate_Type_Name,
                                    MandateId
                                  );
                                }}
                              />
                            </div>
                          </Tooltip>
                        )}
                      {Status !== endpoints.approved &&
                        Status === endpoints.mandateRegister &&
                        Mandate_Type_Name === endpoints.mandatePhysical && (
                          <Tooltip
                            placement={Labels.bottom}
                            title={
                              <span style={{ color: "#F49D37" }}>
                                {Labels.delete}
                              </span>
                            }
                            color="#FFEFDC"
                          >
                            <div className="icon-tooltip">
                              <img
                                src={Trash}
                                alt=""
                                onClick={() => {
                                  setIsMandateId(MandateId);
                                  setIsDeleteModel(true);
                                }}
                              />
                            </div>
                          </Tooltip>
                        )}
                      {Mandate_Type === endpoints.mandateTypeKey_N ? (
                        <NormalButton
                          label={Labels.authorize}
                          onClick={() => {
                            handleAuthorize(MandateId);
                          }}
                          isPrimay={true}
                        />
                      ) : (
                        <>
                          <Tooltip
                            placement={Labels.bottom}
                            title={
                              <span style={{ color: "#F49D37" }}>
                                {Labels.mail}
                              </span>
                            }
                            color="#FFEFDC"
                          >
                            <div className="icon-tooltip">
                              <img
                                src={MailIcon}
                                alt=""
                                onClick={() => {
                                  handleMail(MandateId, Client_Code);
                                }}
                              />
                            </div>
                          </Tooltip>
                          {Mandate_Type === endpoints.Mandate_Type_key && (
                            <Tooltip
                              placement={Labels.bottom}
                              title={
                                <span style={{ color: "#F49D37" }}>
                                  {Labels.CopyUMRN}
                                </span>
                              }
                              color="#FFEFDC"
                            >
                              <div className="icon-tooltip">
                                <CopyToClipboard text={MandateId}>
                                  <span>
                                    <img
                                      alt=""
                                      src={Copy}
                                      onClick={() => {
                                        handleCopied(MandateId);
                                      }}
                                    />
                                  </span>
                                </CopyToClipboard>
                              </div>
                            </Tooltip>
                          )}
                          <Tooltip
                            placement={Labels.bottom}
                            title={
                              <span style={{ color: "#F49D37" }}>
                                {Labels.print}
                              </span>
                            }
                            color="#FFEFDC"
                          >
                            <div className="icon-tooltip">
                              <img
                                src={PrinterIcon}
                                alt=""
                                onClick={() => {
                                  window.open(
                                    `${endpoints.mailTo}${FileURL}`,
                                    "_blank"
                                  );
                                }}
                              />
                            </div>
                          </Tooltip>
                        </>
                      )}
                    </div>
                    {Status === "MANDATE REGISTRATION DONE SUCCESSFULLY" &&
                      Mandate_Type_Name === "Physical Bank Mandate" && (
                        <div className="list-bottom-section">
                          <div className="title">
                            {Labels.uploadMandateFile}
                          </div>
                          {UploadedFileName && (
                            <img
                              src={`${endpoints.mailTo}${UploadedFileName}`}
                              alt=""
                              className="UploadedFileName"
                            ></img>
                          )}
                          {size > 0 && (
                            <>
                              {Object.entries(formDetails).map(
                                ([key, value]) =>
                                  key ===
                                    Mandate_Type_Name.concat(MandateId) && (
                                    <div className="added-img" key={key}>
                                      <>
                                        {value.length > 0 &&
                                          value.map((ele, index) => (
                                            <div key={index}>
                                              <img
                                                src={ele}
                                                alt={key}
                                                className="img"
                                              />
                                              <img
                                                src={CloseIcon}
                                                alt=""
                                                className="close-icon"
                                              />
                                            </div>
                                          ))}
                                      </>
                                    </div>
                                  )
                              )}
                            </>
                          )}
                          <div className="d-flex align-items-center">
                            <NormalButton
                              className="mandate-btn"
                              disabled={
                                formDetails[
                                  Mandate_Type_Name.concat(MandateId)
                                ] && btnloader
                                  ? true
                                  : false
                              }
                              label={Labels.upload}
                              isPrimay={true}
                              onClick={() => {
                                handleUpload(
                                  Mandate_Type_Name,
                                  MandateId,
                                  Client_Code,
                                  Created_By
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                )
            )}
          </>
        ) : (
          <>
            <EmptyRecord />
          </>
        )}
      </div>
      {filteredList?.length > 0 && (
        <Pagination
          pageNumber={page}
          pageChange={setPage}
          handlePageSize={(limit) => {
            setPageCount(limit);
            setPage(1);
          }}
          pageSize={pageCount}
          totalPages={filteredList.length / pageCount}
        />
      )}
      <div className="create-mandate">
        <CreateMandate
          setCreateMandatePopup={setCreateMandatePopup}
          createmandateView={createmandateView}
        />
      </div>
      {isModel && (
        <div className="mandate">
          <Popup isOpen={isModel} setPopup={setIsModel} className="mandate">
            <div className="mandate-popup-success">
              <img src={Success} alt=""></img>
              <div className="body">
                {isModelList.length > 0 &&
                  isModelList.map((ele, index) => (
                    <p key={index} className={`${index === 0 && "green"} `}>
                      {ele}
                    </p>
                  ))}
              </div>
            </div>
          </Popup>
        </div>
      )}
      {isCopyModel && (
        <div className="mandate">
          <Popup isOpen={isCopyModel} setPopup={setIsCopyModel}>
            <div className="mandate-confirm-model">
              <div className="confirm-title">
                <h4>{Labels.urnCopied}</h4>
              </div>
              <p>
                {Labels.copiedTheURN} : {`${isCopiedValue}`}
              </p>
            </div>
          </Popup>
        </div>
      )}
      {isDeleteModel && (
        <div className="delete-mandate">
          <Popup isOpen={isDeleteModel} setPopup={setIsDeleteModel}>
            <div className="mandate-delete-model">
              <div className="confirm-title">
                <h4>{Labels.removeMandate}</h4>
              </div>
              <p>{Labels.selectedMandate}</p>
            </div>
            <div className="delete-btn">
              <NormalButton
                label={Labels.cancel}
                className="primary-btn bordered cancel"
                onClick={() => {
                  setIsDeleteModel(false);
                }}
              />
              <NormalButton
                label={Labels.remove}
                className="primary-btn"
                onClick={() => {
                  handleDelete();
                }}
              />
            </div>
          </Popup>
        </div>
      )}
      {mandateView && (
        <MandateInfoPopup
          setMandateViewPopup={setMandateViewPopup}
          mandateView={mandateView}
        />
      )}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetClientMandateListApiCall: GetClientMandateList,
      MandateFileUploadApiCall: MandateFileUpload,
      MandateFileEmailApiCall: MandateFileEmail,
      GetEMandateAuthURLApiCall: GetEMandateAuthURL,
      DeleteMandateApiCall: DeleteMandate,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(BankMandate);

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShareIcon from "assets/images/share.svg";
import { Toast } from "service/toast";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import SearchInput from "components/Common/SearchInput";
import TableWrapper from "components/Common/TableWrapper";
import { PageLoader } from "components/Common/PageLoader";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { getDataFromStorage } from "service/helperFunctions";
import { ClientReferalHeader } from "service/helpers/Constants";
import { getClientRefer } from "redux/action/clientFlow/ClientReferAct";
import ShareOptions from "components/Common/ShareOptions/index";
import ReferredUsers from "./ReferredUsers";
import "./ClientRefer.scss";

const ClientRefer = (props) => {
  const { Labels, errorText } = useLang();
  const { getClientReferApi } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);
  const [usersList, setUsersList] = useState([]);
  const [usersDuplicateList, setUsersDuplicateList] = useState([]);
  const [search, setSearch] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const { success_title } = endpoints.response_error_msg;
  const { copy_message } = errorText?.refer_error_message || {};
  const userRoleDataValue = getDataFromStorage(
    endpoints.auth.USER_ROLE_kEY,
    endpoints.auth.USER_ROLE_DATA
  );

  useEffect(() => {
    if (userRoleDataValue?.uid) {
      setLoading(true);
      let body = { uid: userRoleDataValue?.uid };
      getClientReferApi(body)
        .then((data) => {
          setUsersList(data?.ContentBasedReferralMappings);
          setUsersDuplicateList(data?.ContentBasedReferralMappings);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [getClientReferApi, userRoleDataValue?.uid]);

  const copyToClipboard = (item) => {
    navigator.clipboard.writeText(item);
    Toast({
      type: success_title,
      message: copy_message,
    });
  };

  const searchHandler = (key) => {
    setSearch(key);
    const searchFilteredData = usersDuplicateList.filter(({ Product_name }) => {
      return Product_name?.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
    setUsersList(searchFilteredData);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="client-refer">
      <div className="page-content my-0">
        <div className="page-content-des">
          <p className="title">{Labels.clientReferral}</p>
        </div>
        <div className="top-content">
          <span>{Labels.referralCode} : </span>
          <span>
            {userRoleDataValue?.ReferralCode}
            <div className="list-menu-list cursor-pointer">
              <img className="cursor-pointer" src={ShareIcon} alt="shareIcon" />
              <ShareOptions
                shareLink={userRoleDataValue}
                copyToClipboard={copyToClipboard}
              />
            </div>
          </span>
          <span
            onClick={() => setOpenPopup(true)}
            className="ps-lg-5 cursor-pointer"
          >
            {Labels.referralCount} : {userRoleDataValue?.ReferralCount}
          </span>
        </div>
        <SearchInput
          placeholder={Labels.search}
          className="rmvieworder-placholder"
          value={search}
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
        {usersList.length > 0 ? (
          <TableWrapper
            className="table-block"
            headerDetails={ClientReferalHeader}
            handlePageSize={(pageSize) => {
              setPage(1);
              setPageLimit(pageSize);
            }}
            pageNumber={page}
            pageSize={pageLimit}
            pageChange={setPage}
            totalPages={usersList?.length / pageLimit}
          >
            {usersList.map((item, index) => {
              return (
                page * pageLimit >= index + 1 &&
                (page - 1) * pageLimit < index + 1 && (
                  <React.Fragment key={index}>
                    <tr className="transaction-table-ui">
                      <td width="40%">{item.Product_name}</td>
                      <td width="30%">{item.LinkVisited}</td>
                      <td width="30%">{item.TransactionDone}</td>
                      <td className="float-right">
                        <div className="list-menu-list cursor-pointer">
                          <img
                            src={ShareIcon}
                            alt="shareIcon"
                            className="cursor-pointer"
                          />
                          <ShareOptions
                            shareLink={item}
                            copyToClipboard={copyToClipboard}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="empty-height" height="12"></td>
                    </tr>
                  </React.Fragment>
                )
              );
            })}
          </TableWrapper>
        ) : (
          <EmptyRecord />
        )}
        {openPopup && (
          <ReferredUsers
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            UserCode={userRoleDataValue?.ClientCode}
            RoleId={userRoleDataValue?.role_id}
          />
        )}
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getClientReferApi: getClientRefer,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ClientRefer));

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserReferralInfo } from "redux/action/clientFlow/ClientReferAct";
import Popup from "components/Common/Popup/Popup";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { ReferredUsersHeader } from "service/helpers/Constants";
import SearchInput from "components/Common/SearchInput";
import TableWrapper from "components/Common/TableWrapper";
import { PageLoader } from "components/Common/PageLoader";
import { EmptyRecord } from "components/Common/EmptyRecord";

const ReferredUsers = (props) => {
  const { openPopup, setOpenPopup, UserCode, RoleId, getUserReferralInfoApi } =
    props;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersDuplicateList, setUsersDuplicateList] = useState([]);
  const [pageLimit, setPageLimit] = useState(endpoints.auth.pageLimit);
  const { Labels } = useLang();

  useEffect(() => {
    setLoading(true);
    let data = {
      UserCode: UserCode,
      RoleId: RoleId,
    };
    getUserReferralInfoApi(data)
      .then((data) => {
        setUsersList(data?.ContentBasedReferralUserInfo);
        setUsersDuplicateList(data?.ContentBasedReferralUserInfo);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getUserReferralInfoApi, UserCode, RoleId]);

  const searchHandler = (key) => {
    setSearch(key);
    const searchFilteredData = usersDuplicateList.filter(
      ({ name, email, phone }) => {
        return (
          name?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          email?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          phone?.indexOf(key) !== -1
        );
      }
    );
    setUsersList(searchFilteredData);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <Popup isOpen={openPopup} setPopup={setOpenPopup}>
        <div className="title">{Labels.referralUserDetails}</div>
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
            headerDetails={ReferredUsersHeader}
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
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.createddate}</td>
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
      </Popup>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserReferralInfoApi: getUserReferralInfo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ReferredUsers));

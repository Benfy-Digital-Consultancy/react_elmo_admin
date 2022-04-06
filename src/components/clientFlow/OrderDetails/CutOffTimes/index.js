import React from "react";
import { useHistory } from "react-router-dom";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { useLang } from "hooks/useLang";
import "./cutOffTimes.scss";

const CutOffTimes = ({ hideHeading }) => {
  const { Labels } = useLang();
  const history = useHistory();

  const breadCrumbsList = [
    {
      redirection: () => history.goBack(),
      label: Labels.orderDetails,
    },
    {
      label: Labels.cutoffTime,
    },
  ];

  return (
    <React.Fragment>
      <div className="cut-off-times">
        <div className="page-content">
          {!hideHeading && <BreadCrumbs breadCrumbsList={breadCrumbsList} />}
          <div className="top-notes">
            <span>*T day - transaction day</span>
            <span>*NAV - Net asset Value</span>
          </div>
          <div className="table-block grey">
            <table cellPadding="0" cellSpacing="0">
              <tr>
                <td rowSpan="3" width="120">
                  Channel
                </td>
                <td rowSpan="3" width="140">
                  Particulars
                </td>
                <td width="20%">Liquid/Overnight Schemes</td>
                <td width="20%">Liquid/Overnight Schemes</td>
                <td width="20%">Equity & Debt Schemes</td>
                <td width="20%">Equity & Debt Schemes</td>
              </tr>
              <tr>
                <td>Any amount</td>
                <td>Any amount </td>
                <td>Transaction value &lt; 2 lakhs</td>
                <td>Transaction value &lt;= 2 lakhs</td>
              </tr>
              <tr>
                <td>For T-1 day NAV(L0)</td>
                <td>For T day NAV( Non L0)</td>
                <td>for T Day NAV(Non L1)</td>
                <td>for T Day NAV(L1)</td>
              </tr>
            </table>
          </div>
          <div className="table-block">
            <table cellPadding="0" cellSpacing="0">
              <tr>
                <td rowSpan="3" width="120">
                  <strong>BSE</strong>
                </td>
                <td width="140">Order time</td>
                <td width="20%">9:00 am to 1 pm </td>
                <td width="20%">1:00 pm to 2:30 pm </td>
                <td width="20%">1:00 pm to 2:30 pm </td>
                <td width="20%">1:00 pm to 2:30 pm </td>
              </tr>
              <tr>
                <td>Funds transfer /credit to BSE </td>
                <td>9:00 am to 1 pm </td>
                <td>1:00 pm to 2:30 pm </td>
                <td>1:00 pm to 2:30 pm </td>
                <td>1:00 pm to 2:30 pm </td>
              </tr>
              <tr>
                <td>Redemption </td>
                <td>9:00 am to 1 pm </td>
                <td>1:00 pm to 2:30 pm </td>
                <td>1:00 pm to 2:30 pm </td>
                <td>1:00 pm to 2:30 pm </td>
              </tr>
            </table>
          </div>
          <p className="description">
            Clients can make payment from Web/Mobile app window or alternatively
            client will also get payment Link via Email & SMS from BSE for
            making payment, following this link we give you below listed payment
            options, select your payment mode and make the payment. In case
            payment mode is Cheque please do not initiate payment from this
            link.
          </p>
          <div className="list-outer">
            <div className="list-title">
              <span>Payment Modes</span>
            </div>
            <ul className="list-inner">
              <li className="list-content">
                <div className="mb-3 pb-1">
                  Direct Pay – BSE has listed 8 banks as Direct pay, credit of
                  funds to ICCL ( BSE) happens on real time, client should check
                  their bank limit on net-banking transfers
                </div>
                <span className="mb-3 pb-1">Direct Bank List</span>
                <ul>
                  <li>ICICI Bank</li>
                  <li>AXIS Bank</li>
                  <li>Yes Bank</li>
                  <li>HDFC Bank</li>
                  <li>IDBI Bank</li>
                  <li>Kotak Mahindra Bank</li>
                  <li>SBI</li>
                  <li>Equitas Small Fin</li>
                </ul>
              </li>
              <li className="list-content">
                Nodal – All other banks other than the Direct ones comes under
                Nodal category, credit of funds to ICCL ( BSE) happens on T+1 or
                T+2 days, client should check their bank limit on net-banking
                transfers
              </li>
              <li className="list-content">
                Nodal – All other banks other than the Direct ones comes under
                Nodal category, credit of funds to ICCL ( BSE) happens on T+1 or
                T+2 days, client should check their bank limit on net-banking
                transfersNodal – All other banks other than the Direct ones
                comes under Nodal category, credit of funds to ICCL ( BSE)
                happens on T+1 or T+2 days, client should check their bank limit
                on net-banking transfers
              </li>
              <li className="list-content">
                One Time mandate – Client can make payment from their approved
                Bank mandates, Credit of funds to ICCL happens T+2 till T+5 days
              </li>
              <li className="list-content">UPI - Credit of Funds is instant</li>
              <li className="list-content">
                Cheques – Do not select any option form payment link, ignore
                link and follow this process Cheques can be submitted at Karvy
                Office and AXIS Bank Branch Cheque should be in favour of "
                ICCL"
              </li>
            </ul>
          </div>
          <div className="list-outer">
            <div className="list-title">
              <span>Karvy Process</span>
            </div>
            <ul className="list-inner">
              <li className="list-content">
                Client can issue a single cheque for all the investments made in
                a single day
              </li>
              <li className="list-content">
                Order number, client code and the member ID - 11758 needs to be
                mentioned on the back of cheque
              </li>
              <li className="list-content">
                Cheques should be submitted by 5:30 T day at specific Karvy
                office for all funds including CAMS registered funds as well
              </li>
              <li className="list-content">Take proper receiving from Karvy</li>
              <li className="list-content">
                Allotment of units will happen on the realization of the cheques
                for all Liquid transactions and for Debt/Equity transactions
                &gt;= 2lakhs
              </li>
            </ul>
          </div>
          <div className="list-outer">
            <div className="list-title">
              <span>AXIS Bank Process</span>
            </div>
            <ul className="list-inner">
              <li className="list-content">
                Create Challan from your app and Web Login
              </li>
              <li className="list-content">
                Click on View orders, Click on generate Challan, Enter cheque
                number, Cheque date and amount
              </li>
              <li className="list-content">
                Take print out of Challan and submit it to Axis Bank along with
                the cheque , in case the printer is not available then fill a
                deposit slip and mention "Challan No. & EASY PAY" on it and
                submit with cheque.
              </li>
              <li className="list-content">Take proper receiving from Bank</li>
              <li className="list-content">
                Allotment of units will happen on the realization of the cheques
                for all Liquid transactions and for Debt/Equity transactions
                &gt;= 2lakhs
                <span className="mt-4 pt-3">
                  (Do not initiate payment through the payment link in case
                  payment mode is Cheque)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CutOffTimes;

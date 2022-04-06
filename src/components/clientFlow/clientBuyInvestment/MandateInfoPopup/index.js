import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Popup from "components/Common/Popup/Popup";
import "./style.scss";

const MandateInfoPopup = ({ setMandateViewPopup, mandateView = false }) => {
  return (
    <div className="success-popup">
      <Popup isOpen={mandateView} setPopup={setMandateViewPopup}>
        <div className="mandate-info-title">MANDATE INFORMATION</div>
        <div className="info-popup-subtitle">
          What is a ‘bank mandate’ and why it is required :
        </div>
        <p>
          A bank mandate is an authorisation provided by you to debit your
          linked bank account for both SIP and One-Time mutual fund investments.
          One single bank mandate, once approved, can be used to make
          investments across all schemes of all AMCs available on nivesh.com Key
          points to note:
        </p>
        <ul>
          <li>
            Once approved, future SIP installments will be auto-debited from
            your bank account
          </li>
          <li>
            The amount in the bank mandate is the maximum permissible amount
            that can be debited from your account on a single day.
          </li>
          <li>
            The amount debited from your bank account will be the amount of SIP
            installment and not the amount specified in the bank the mandate
          </li>
          <li>
            A bank mandate can be used for doing one-time purchases as well as
            long as the purchase amount falls within the mandate amount limit.
          </li>
        </ul>
        <div className="info-popup-subtitle">
          Nivesh.com supports 3 different kinds of bank mandates:
        </div>
        <ul>
          <li>E-Mandate</li>
          <li>Physical Bank Mandate</li>
          <li>Net Banking Mandate</li>
        </ul>
        <h5 id="emandate">
          <span>E-Mandate</span>
        </h5>

        <span>
          It's the most efficient way of creating a bank mandate and is
          completely paperless.
        </span>
        <span>This mandate is Aadhaar-based and requires the following:</span>
        <ul>
          <li>
            <span>
              Your mobile number and email ID to be linked to your Aadhaar
              number
            </span>
          </li>
          <li>
            <span>
              Your Aadhaar number to be registered against your bank account
            </span>
          </li>
        </ul>
        <h3>How to create an E-Mandate on Nivesh.com</h3>
        <ul>
          <li>
            <span>Create a fresh E-Mandate</span>
          </li>
          <li>
            <span>
              Receive a link on your email ID registered with Nivesh.com,
              informing on e-signing of the mandate
            </span>
          </li>
          <li>
            <span>
              Click the link, fill your Aadhaar number on the displayed form and
              submit
            </span>
          </li>
          <li>
            <span>
              OTP will be sent to your mobile number and email ID linked to your
              Aadhaar
            </span>
          </li>
          <li>
            <span>Fill-in the OTP and submit for processing </span>
          </li>
          <li>
            <span>The E-Mandate gets approved within 3-4 days</span>
          </li>
          <li>
            <span>
              You will receive SMS alert informing you of the status of
              registration.
            </span>
          </li>
        </ul>
        <h5 id="physicalmandate">
          <span>Physical Bank Mandate</span>
        </h5>
        <span>
          This bank mandate requires your signatures on printed mandate form:.{" "}
        </span>
        <span>In this case,</span>
        <ul>
          <li>
            <span>
              On mandate registration, a filled-in electronic mandate form is
              generated from our system and emailed to you and your sub-broker.{" "}
            </span>
          </li>
          <li>
            <span>
              This mandate form needs to be printed, signed by you and sent to
              us directly / through your sub-broker
            </span>
          </li>
          <li>
            <span>
              The signed mandate form is forwarded to the bank for further
              processing.{" "}
            </span>
          </li>
          <li>
            <span>
              The overall approval process takes around 20-30 working days.
            </span>
          </li>
        </ul>

        <h5 id="netbankingmandate">
          <span>Net Banking Mandate</span>
        </h5>
        <span>
          This mandate is setup through the Net Banking Account of the investor.{" "}
        </span>
        <span>The process is as follows:</span>
        <ul>
          <li>
            <span>
              On mandate registration, a UMRN will be displayed on the mandate
              creation screen
            </span>
          </li>
          <li>
            <span>
              Copy this UMRN to clipboard using the option provided on screen.
            </span>
          </li>
          <li>
            <span>
              Login to your Net Banking account and go to the Biller section
            </span>
          </li>
          <li>
            <span>
              Choose BSE Ltd as biller and fill-in the UMRN in the URN field
            </span>
          </li>
          <li>
            <span>
              Choose Debit from your bank account (not from debit card or credit
              card)
            </span>
          </li>
          <li>
            <span>
              Choose no limit for the amount as the amount is limited by the
              I-Mandate
            </span>
          </li>
          <li>
            <span>Complete the process as instructed by your bank</span>
          </li>
          <li>
            <span>The overall approval process takes around a week</span>
          </li>
        </ul>
        <p></p>
      </Popup>
    </div>
  );
};

export default connect(null, null)(withRouter(MandateInfoPopup));

import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ShareFacebook from "assets/images/share-facebook.png";
import ShareTwitter from "assets/images/share-twitter.png";
import ShareEmail from "assets/images/share-email.png";
import ShareLinkedin from "assets/images/share-linkedin.png";
import ShareWhatsapp from "assets/images/share-whatsapp.png";
import ShareCopy from "assets/images/share-copy.png";

const ShareOptions = (props) => {
  const { shareLink, copyToClipboard } = props;
  const link = shareLink?.ReferralLink;

  return (
    <div className="social-media">
      <div className="social-media-bg">
        <span
          onClick={() => {
            window.open(
              `https://facebook.com/sharer/sharer.php?u=+${link}+&amp;quote=+Welcome to Nivesh, Please follow the link to make purchase.+`,
              "Share on Facebook",
              600,
              600
            );
            return false;
          }}
        >
          <img src={ShareFacebook} alt="" />
        </span>
        <span
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet/?text=Welcome to Nivesh, Please follow the link to make purchase. %0D%0A Link - &amp;url=${link}`,
              "Share on Twitter",
              600,
              600
            );
            return false;
          }}
        >
          <img src={ShareTwitter} alt="shareTwitter" />
        </span>
        <span
          onClick={() => {
            window.open(
              `mailto:?subject=Welcome to Nivesh, Please follow the link to make purchase.&amp;body=Welcome to Nivesh, Please follow the link to make purchase. %0D%0A Link - ${link}`,
              "Share on Mail",
              600,
              600
            );
            return false;
          }}
        >
          <img src={ShareEmail} alt="shareEmail" />
        </span>
        <span
          onClick={() => {
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&amp;url=${link}&amp;title=+Welcome to Nivesh, Please follow the link to make purchase.+Link - ${link}+.&amp;summary=+Welcome to Nivesh, Please follow the link to make purchase.+&amp;source=http%3A%2F%2Fsharingbuttons.io`,
              "Share on LinkedIn",
              600,
              600
            );
            return false;
          }}
        >
          <img src={ShareLinkedin} alt="shareLinkedin" />
        </span>
        <span
          onClick={() => {
            window.open(
              `https://api.whatsapp.com/send?text=Welcome to Nivesh, Please follow the link to make purchase. Link - ${link}`,
              "Share on Whatsapp",
              600,
              600
            );
            return false;
          }}
        >
          <img src={ShareWhatsapp} alt="shareWhatsapp" />
        </span>
        <CopyToClipboard onCopy={() => copyToClipboard(link)}>
          <span>
            <img src={ShareCopy} alt="shareCopy" />
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShareOptions;

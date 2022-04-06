import React from "react";

export default function ActiveCardFirstRow({
  title1,
  title1Value,
  title2,
  title2Value,
  title3,
  title3Value,
  title4,
  title4Value,
}) {
  const BoxCardChild = (title, value) => {
    return (
      <div className="row">
        <div className="col-6 ">
          <h6 className="box-first-child">{title} : </h6>
        </div>
        <div className="col-6 d-flex">
          <h6 className="box-second-child">{value}</h6>
        </div>
      </div>
    );
  };
  return (
    <div className="row">
      <div className="col-lg-3">{BoxCardChild(title1, title1Value)}</div>
      <div className="col-lg-3">{BoxCardChild(title2, title2Value)}</div>
      <div className="col-lg-4">{BoxCardChild(title3, title3Value)}</div>
      {title4 && (
        <div className="col-lg-2">{BoxCardChild(title4, title4Value)}</div>
      )}
    </div>
  );
}

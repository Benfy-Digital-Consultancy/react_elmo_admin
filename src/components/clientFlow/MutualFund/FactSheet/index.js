import React from "react";
import Multiselect from "multiselect-react-dropdown";
import PDFIcon from "assets/images/pdf-new.png";
import Popup from "components/Common/Popup/Popup";
import DropdownIcon from "assets/images/dropdown-icon.svg";
import { useLang } from "hooks/useLang";

function FactSheet(props) {
  const { Labels } = useLang();
  const {
    setFactsheetPopup,
    multiSelctedValue,
    mulitSelectYearList,
    factSheetlist,
    dublicateSheeList,
    factsheetPopupView,
    setFactsheetPopupView,
    factsheetPopup,
    pdfPath,
    setPdfPath,
    onSelect,
    onRemove,
    setFactSheetList,
  } = props;

  const searchHandler = (key) => {
    const searchFilteredData = dublicateSheeList.filter(
      ({ FactsheetMonthYear }) => {
        return (
          FactsheetMonthYear.toLowerCase().indexOf(key.toLowerCase()) !== -1
        );
      }
    );
    setFactSheetList(
      searchFilteredData.length > 0 ? searchFilteredData : factSheetlist
    );
  };

  return (
    <div className="factsheet-popup">
      {factsheetPopup && (
        <Popup isOpen={factsheetPopup} setPopup={setFactsheetPopup}>
          <div className="title">{Labels.factSheet}</div>
          <div className="factsheet-multiselectdropdown">
            <Multiselect
              options={mulitSelectYearList}
              isObject={false}
              selectedValues={multiSelctedValue}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="FactsheetMonthYear"
              showCheckbox={true}
              placeholder={Labels.selectyear}
              onSearch={(searchKey) => {
                searchHandler(searchKey);
              }}
              showArrow={true}
              customArrow={
                <img
                  className="cursor-pointer"
                  src={DropdownIcon}
                  alt="dropdownIcon"
                />
              }
            />
          </div>
          <div className="factsheet-list">
            <div className="list-header">
              <div className="left">{Labels.duration}</div>
              <div className="right"></div>
            </div>
            {factSheetlist?.length > 0 ? (
              factSheetlist.map((val, index) => {
                return (
                  <div
                    key={index}
                    className="list-content cursor-pointer"
                    onClick={() => {
                      setFactsheetPopupView(true);
                      setFactsheetPopup(false);
                      setPdfPath(val);
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <p className="mb-0">{val.FactsheetMonthYear}</p>
                      <img src={PDFIcon} alt="pdfIcon" className="mx-3" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center mt-4">{Labels.noDataFound}</div>
            )}
          </div>
        </Popup>
      )}
      {factsheetPopupView && (
        <Popup
          isOpen={factsheetPopupView}
          setPopup={() => {
            setFactsheetPopupView(false);
            setFactsheetPopup(true);
          }}
        >
          <div className="title left-aligned">
            {pdfPath?.name} - {pdfPath?.FactsheetMonthYear}
          </div>
          <div className="popup-description">
            <iframe
              src={pdfPath?.path}
              title={Labels.FactSheets}
              style={{ width: "100%", height: 500 }}
            ></iframe>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default FactSheet;

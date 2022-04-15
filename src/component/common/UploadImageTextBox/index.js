import React from "react";
import "./style.scss";
const UploadImageTextBox = () => {
  return (
    <div>
      <div className="uploadImageBox">
        <label for="files" class="btn">
          <span className="add-file-btn mt-4">Upload Image</span>
        </label>
      </div>
      <input
        id="files"
        style={{ visibility: "hidden" }}
        accept="image/*"
        // onChange={getImages}
        type="file"
      />
    </div>
  );
};

export default UploadImageTextBox;

// components/ProgressBar.js
import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressBar">
      <div className="progress" style={{ width: `${progress}%` }}>
        {progress}
      </div>
    </div>
  );
};

export default ProgressBar;

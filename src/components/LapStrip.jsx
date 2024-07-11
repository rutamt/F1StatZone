import React from "react";
import { Space } from "antd";

const LapStrip = ({ currentLap }) => {
  const renderSegment = (segment, index) => {
    let color;
    switch (segment) {
      case 2048:
        color = "yellow";
        break;
      case 2049:
        color = "green";
        break;
      case 2051:
        color = "purple";
        break;
      case 2064:
        color = "blue";
        break;
      default:
        color = "gray";
    }
    console.log("lapstrip cl: ", currentLap);
    return (
      <div
        key={`${segment}-${index}`} // Add a unique key prop
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: color,
          margin: "1px",
          display: "inline-block",
        }}
      />
    );
  };

  if (!currentLap) {
    return null; // Render nothing if currentLap is null or undefined
  }

  return (
    <div className="lap-strip">
      {currentLap.segments_sector_1.map((segment, index) =>
        renderSegment(segment, index)
      )}
      <span style={{ marginRight: "5px" }} />
      {currentLap.segments_sector_2.map((segment, index) =>
        renderSegment(segment, index)
      )}
      <span style={{ marginRight: "5px" }} />

      {currentLap.segments_sector_3.map((segment, index) =>
        renderSegment(segment, index)
      )}
    </div>
  );
};

export default LapStrip;

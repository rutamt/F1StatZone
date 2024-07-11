import LapStrip from "./LapStrip";
import { Row, Col } from "antd";

const LapDataComponent = ({ currentLap }) => {
  // Converts lap times to more readable format
  function formatTime(seconds) {
    // Split seconds into minutes and fractional seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = (seconds % 60).toFixed(3);

    // Format the remaining seconds to three decimal places
    if (remainingSeconds < 10) {
      remainingSeconds = `0${remainingSeconds}`;
    }

    // Return formatted time string
    return `${minutes}:${remainingSeconds}`;
  }

  return (
    <>
      <LapStrip currentLap={currentLap} />
      <h1>Lap time: {formatTime(currentLap.lap_duration)} </h1>
      <Row justify={"center"}>
        <Col span={4}>{currentLap.duration_sector_1}</Col>
        <Col span={4}>{currentLap.duration_sector_2}</Col>
        <Col span={4}>{currentLap.duration_sector_3}</Col>
      </Row>
      {currentLap.is_pit_out_lap && <h1>Out lap</h1>}
    </>
  );
};

export default LapDataComponent;

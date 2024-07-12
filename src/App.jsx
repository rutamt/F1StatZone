import { useEffect, useState } from "react";
import { Cascader, InputNumber, Space } from "antd";

import raceOptions from "./assets/data/raceoptions";
import LapDataComponent from "./components/LapDataComponent";
import DriverDisplay from "./components/DriverDisplay";
import "./App.css";

let radioIndex = 0;

function App() {
  const [radioUrls, setRadioUrls] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [lapData, setLapData] = useState([]);
  const [mapLaps, setMaxLaps] = useState(0);
  const [currentLap, setCurrentLap] = useState(null);
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    // getRadio();
  }, []);

  // Gets the team radio messages given a driver number (session number already known)
  const getRadio = (number) => {
    setRadioUrls([]);
    fetch(
      `https://api.openf1.org/v1/team_radio?session_key=${sessionId}&driver_number=${number}`
    )
      .then((response) => response.json())
      .then((data) => {
        const recordingUrls = data.map((item) => item.recording_url);
        recordingUrls.forEach((url) => {
          setRadioUrls((r) => [...r, { id: radioIndex++, url }]);
        });
        console.log("url", recordingUrls);
      });
  };

  // Cascader for selecting race
  const onChange = (value) => {
    setSessionId(value[1]);
    console.log(value[1]);

    // Finding all drivers
    fetch(`https://api.openf1.org/v1/drivers?session_key=${value[1]}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const recordingUrls = data.map((item) => item);
        recordingUrls.forEach((item) => {
          setDrivers((r) => [
            ...r,
            {
              value: item.driver_number,
              label: item.full_name,
            },
          ]);
        });
        console.log(drivers);
      });
  };

  // Gets the data of all the laps a driver did in a race
  const getLapData = (value) => {
    fetch(
      `https://api.openf1.org/v1/laps?session_key=${sessionId}&driver_number=${value}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLapData(data);
        const maxLapNumber = Math.max(...data.map((lap) => lap.lap_number));
        console.log("Max laps: ", maxLapNumber);
        setMaxLaps(maxLapNumber);
      });
  };

  // Gets the data of the selected driver
  const getDriverData = (value) => {
    fetch(
      `https://api.openf1.org/v1/drivers?session_key=${sessionId}&driver_number=${value}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDriverData(data[0]);
      });
  };

  // Getting the radios on change of the second cascader
  const onDriverChange = (value) => {
    getRadio(value);
    getLapData(value);
    getDriverData(value);
  };

  const onLapNumChange = (lapNumber) => {
    const currentLapData = lapData.filter(
      (lap) => lap.lap_number === lapNumber
    );
    setCurrentLap(currentLapData[0]);
    console.log(currentLapData[0].segments_sector_1);
  };

  // https://api.openf1.org/v1/drivers?meeting_key=1226
  return (
    <>
      <Space>
        <Cascader
          options={raceOptions}
          onChange={onChange}
          placeholder="Please select"
        />

        <Cascader onChange={onDriverChange} options={drivers} />
        <InputNumber min={1} max={mapLaps} onChange={onLapNumChange} />
      </Space>
      <ol style={{ listStyle: "none" }}>
        {radioUrls.map((radio) => (
          <li key={radio.id}>
            <audio controls>
              <source src={radio.url} />
            </audio>
          </li>
        ))}
      </ol>
      {currentLap ? (
        <LapDataComponent currentLap={currentLap} />
      ) : (
        <p>loading lap data...</p>
      )}
      {driverData ? (
        <DriverDisplay driver={driverData} />
      ) : (
        <p>loading driver data...</p>
      )}
    </>
  );
}

export default App;

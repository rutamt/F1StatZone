import { useEffect, useState } from "react";
import { Cascader } from "antd";

import raceOptions from "./assets/data/raceoptions";
import "./App.css";

let radioIndex = 0;

function App() {
  const [radioUrls, setRadioUrls] = useState([]);
  useEffect(() => {
    getRadio();
  }, []);

  const getRadio = () => {
    fetch(
      "https://api.openf1.org/v1/team_radio?session_key=9158&driver_number=11"
    )
      .then((response) => response.json())
      .then((data) => {
        const recordingUrls = data.map((item) => item.recording_url);
        recordingUrls.forEach((url) => {
          setRadioUrls((r) => [...r, { id: radioIndex++, url }]);
        });
        console.log(recordingUrls);
      });
  };

  const onChange = (value) => {
    console.log(value);
  };
  // https://api.openf1.org/v1/drivers?meeting_key=1226
  return (
    <>
      <Cascader
        options={raceOptions}
        onChange={onChange}
        placeholder="Please select"
      />
      {radioUrls.map((radio) => (
        <audio controls key={radio.id}>
          <source src={radio.url} />
        </audio>
      ))}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Cascader, Checkbox } from "antd";

import raceOptions from "./assets/data/raceoptions";
import "./App.css";

let radioIndex = 0;

function App() {
  const [radioUrls, setRadioUrls] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [compare, setCompare] = useState(false);

  useEffect(() => {
    // getRadio();
  }, []);

  const getRadio = (number) => {
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

  // Getting the radios on change of the second cascader
  const onDriverChange = (value) => {
    getRadio(value);
  };

  const onCheckChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setCompare(e.target.checked);
  };

  // https://api.openf1.org/v1/drivers?meeting_key=1226
  return (
    <>
      <Checkbox onChange={onCheckChange}>Compare</Checkbox>
      <Cascader
        options={raceOptions}
        onChange={onChange}
        placeholder="Please select"
      />
      {drivers && (
        <Cascader
          onChange={onDriverChange}
          options={drivers}
          {...(compare ? { multiple: true } : {})}
        />
      )}
      <ol style={{ listStyle: "none" }}>
        {radioUrls.map((radio) => (
          <li>
            <audio controls key={radio.id}>
              <source src={radio.url} />
            </audio>
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;

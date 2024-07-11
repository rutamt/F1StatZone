import { Card, Avatar } from "antd";

const DriverDisplay = (driver) => {
  console.log("COMPTL", driver);
  return (
    <>
      <Card>
        {driver.first_name && driver.last_name
          ? `${driver.first_name} ${driver.last_name}`
          : driver.full_name}
      </Card>
    </>
  );
};

export default DriverDisplay;

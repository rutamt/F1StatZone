import { Card, Avatar, Space } from "antd";

const DriverDisplay = (driver) => {
  const driverData = driver.driver;
  console.log("COMPTL", driverData);
  return (
    <>
      <Card>
        <Space>
          <Avatar
            src={driverData.headshot_url}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
          />
          <h1 style={{ fontWeight: "normal" }}>
            {driverData.first_name && driverData.last_name
              ? `${driverData.first_name} ${driverData.last_name}`
              : driverData.full_name}
          </h1>
        </Space>
      </Card>
    </>
  );
};

export default DriverDisplay;

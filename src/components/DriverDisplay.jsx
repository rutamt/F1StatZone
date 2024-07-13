import { Card, Avatar, Space, Row, Col, Typography } from "antd";
import countryCodes from "../assets/data/countryCodes";

const { Title } = Typography;

const DriverDisplay = (driver) => {
  const driverData = driver.driver;

  const driverName = driverData.last_name
    ? `${driverData.first_name} ${driverData.last_name}`
    : driverData.full_name;

  const getIso2FromIso3 = (iso3Code) => {
    return countryCodes[iso3Code] ? countryCodes[iso3Code].iso2 : "aq";
  };

  const countryCode = getIso2FromIso3(driverData.country_code).toLowerCase();

  return (
    <>
      <Card>
        <Row align={"middle"} justify={"space-around"}>
          <Space>
            <Col>
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
            </Col>
            <Col>
              <Title
                style={{
                  fontWeight: "normal",
                  marginBottom: "0px",
                  textAlign: "left",
                }}
              >
                {driverName}
              </Title>
              <Title
                level={4}
                style={{
                  textAlign: "left",
                  marginTop: "0px",
                  fontWeight: "normal",
                  color: `#${driverData.team_colour}`,
                }}
              >
                {driverData.team_name}
              </Title>
            </Col>
            <Col>
              {
                <img
                  src={`https://flagcdn.com/w40/${countryCode}.png`}
                  srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
                  width="40"
                  alt={countryCode}
                  style={{ border: "1px", borderBlockColor: "black" }}
                />
              }
            </Col>
          </Space>
        </Row>
      </Card>
    </>
  );
};

export default DriverDisplay;

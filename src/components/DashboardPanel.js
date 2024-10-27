import React from "react";
import styled from "styled-components";

const PanelContainer = styled.div`
  width: 80%;
  background-color: rgba(30, 30, 70, 0.8);
  border: 2px solid #39ff14;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  color: #39ff14;
`;

const Stat = styled.div`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const DashboardPanel = () => {
  return (
    <PanelContainer>
      <h2>Real-Time Stats</h2>
      <Stat>Active Users: 1023</Stat>
      <Stat>Response Rate: 98%</Stat>
      <Stat>Emergency Alerts: 5</Stat>
    </PanelContainer>
  );
};

export default DashboardPanel;

import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

const AppLayout = ({ children }) => {
  return (
    <AppWrapper>
      <Navbar />
      {children}
    </AppWrapper>
  );
};

export default AppLayout;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

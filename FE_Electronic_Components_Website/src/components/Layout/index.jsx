import React, {createContext, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import MainNavigationAdmin from "./MainNavigationAdmin";
import { TokenProvider } from "./TokenContext";

const Index = (props) => {
  const location = useLocation();
  const path = location.pathname;
  const isCheck = path.includes("admin");
  return (
    <TokenProvider>
      <React.Fragment>
      {isCheck === false ? <MainNavigation/> : <MainNavigationAdmin/>}
      {/* <MainNavigation/> */}
      <main>{props.children}</main>
    </React.Fragment>
    </TokenProvider>
    
  );
};

export default Index;

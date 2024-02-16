"use client";
import React, { useEffect } from "react";
import StartPage from "./start";

import { useAppDispatch } from "@/hooks";

import Login from "./login";
import NewClient from "./new-client";
import Home from "./home";
import ClientDetails from "./client-details";
import ClientInfo from "./client-info";

const index = () => {
  return (
    <>
      <StartPage />
      {/* <NewClient /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <ClientDetails /> */}
      {/* <ClientInfo /> */}
    </>
  );
};

export default index;

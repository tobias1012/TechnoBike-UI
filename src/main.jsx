import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


import App from "./App";
import "./style.css";
import 'leaflet/dist/leaflet.css'
import {RouterProvider } from "react-router-dom";

import { router } from "./routers/router";

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>
);

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Box, Button, Icon, Link, Text } from "@chakra-ui/react";
import { Bike } from "./components/bike";

import {GrBike} from 'react-icons/gr'
import { Outlet } from "react-router";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [bikesConnected, setBikesConnected] = useState("");
  const [bikes, setBikes] = useState("");

  async function getNumBikes() {
    setBikesConnected(await invoke("get_num_bikes"));
  }

  async function getBikes() {
    setBikes(await invoke("get_bikes"));
  }

  async function set_rider(id, name, age, weight) {
    invoke("set_bike_rider", {id: id, name: name, age: age, weight: weight})
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getNumBikes();
      getBikes();
      
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box style={{height: "100vh" }}>
      <Outlet />
    </Box>
  );  
}

export default App;

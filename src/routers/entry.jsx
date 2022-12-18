import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Box, Button, Icon, Link, Text } from "@chakra-ui/react";
import { Bike } from "../components/bike";

import {GrBike} from 'react-icons/gr'

export const Entry = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [bikesConnected, setBikesConnected] = useState("0");
  const [bikes, setBikes] = useState("");

  async function getNumBikes() {
    setBikesConnected(await invoke("get_num_bikes"));
  }

  async function getBikes() {
    setBikes(await invoke("get_bikes"));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getNumBikes();
      getBikes();
      
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Text fontSize={65}>Velkommen til Spinning</Text>

      <Text fontSize={45}>Der er {bikesConnected} Cykler sluttet til!</Text>
      <div className="row">
        <Bike bike=""/>
        {bikes}
      </div>


      <Link href="/menu"> <Button colorScheme="blue" leftIcon={<Icon as={GrBike} />} rightIcon={<Icon as={GrBike} />}>START!</Button></Link>
    </div>
  );  
}
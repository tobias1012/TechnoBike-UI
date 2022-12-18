import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import GpxParser from 'gpxparser';
import { useState } from 'react';
import { GPXGraph } from '../../../components/gpx_graph';
import { GPXMap } from '../../../components/gpx_map';


const get_gpx = (text) => {
    var gpx = new GpxParser();
    gpx.parse(text);
    return gpx;
            
}


export const RacingGame = (props) => {
    const [GPXFile, setGPXFile] = useState("");

    async function getGpxFile(file) {
        let r = await fetch(`/${file}`);
        let text = await r.text();
        setGPXFile(text)
    }
    getGpxFile(props.file)
    if (GPXFile == ""){
        return <Text>Loading</Text>
    }
    let gpx = get_gpx(GPXFile);
    console.log(gpx);

    let track = gpx.routes[0]; 
    if (gpx.routes.length == 0) {
        track = gpx.tracks[0]; 
    }

    let positions2D = track.points.map(p => [p.lat, p.lon] );
    let positions3D = track.points.map(p => [p.lat, p.lon, p.ele] );    
    
    return (
        <Box>
            <VStack>
                <GPXGraph positions={positions3D}/>

                <GPXMap positions={positions2D} />
            </VStack>
        </Box>
    );
    
};
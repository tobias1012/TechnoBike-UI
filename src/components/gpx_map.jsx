import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { Box } from "@chakra-ui/react";

export const GPXMap = (props) => {
    let positions = (props.positions);
    return (
            <MapContainer style={{ width: "100%", height: "83vh"}} center={positions[positions.length / 2]} zoom={14} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline pathOptions={{ fillColor: 'red', color: 'blue' }}
                positions={positions}/>

            </MapContainer>
    );
};
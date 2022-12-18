import { Text } from "@chakra-ui/react";
import { Chart, LinearScale, LineElement, PointElement, Title } from "chart.js";
import 'chart.js/auto';

import haversine from 'haversine-distance';

import { Line } from "react-chartjs-2";

Chart.register(
    LinearScale,
    PointElement,
    LineElement
);

export const GPXGraph = (props) => {
    let y = props.positions.map(p => p[2]);
    console.log(y);
    let latlon = props.positions.map(p => [p[0], p[1]]);

    let x = [0];
    for(let i = 0; i < latlon.length -1; i++) {
        let prev_dist = x[i-1] || 0;
        x.push(prev_dist + haversine(latlon[i], latlon[i+1]));
    }
    const data = {
        labels: x,
        datasets: [
          {
            label: "rute",
            data: y,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },

        ],
      };

    return (
        <>
        <Line data={data} />
        </>
    );

}
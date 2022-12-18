import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Menu from "./menu";
import { Entry } from "./entry";
import { RacingMenu } from "./games/racing/RacingMenu";
import { RacingGame } from "./games/racing/RacingGame";

export const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Entry />,
          index: true,
        },
        {
          path: "menu",
          element: <Menu />,
        },
        {
          path: "racing",
          element: <RacingMenu />,
        },
        {
            path: "racing/game",
            element: <RacingGame file="alpe.gpx"/>
        }
      ],
    },
  ]);
  
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { geoCentroid } from "d3-geo";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const Chart = dynamic(() => import("./Chart"), { ssr: false });
const ChartGender = dynamic(() => import("./ChartGender"), { ssr: false });
//import {Chart} from './Chart'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import styles from "../styles/Home.module.css";
import allStates from "../data/allstates.json";
import { stat } from "fs/promises";
import { AnyARecord } from "dns";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface StateProp {
  stateData: any;
}

interface StateProps {
  stateName: string | undefined;
}
interface StateNameProps {
  stateName: string;
}

const MapChart: React.FC<StateProp> = ({ stateData }) => {
  const [name, setName] = useState<StateProps>({ stateName: "" });
  const [stateName, setStateName] = useState<StateNameProps>({ stateName: "" });
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = React.useState(true);

  let audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/sounds/click.mp3") : undefined
  );

  const style = {
    position: "absolute" as "absolute",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    scroll: "auto",
  };
  const start = () => {
    audio.current?.play();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 900,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#536878"
                  geography={geo}
                  fill="#36454f"
                  id={geo.rsmKey}
                  onClick={(e) => {
                    start();
                    setChange(true);
                    const state = e.currentTarget;
                    if (change) {
                      state.style.fill = "#2f4f4f";
                      state.style.stroke = "#177245";
                      state.style.strokeWidth = "2px";
                      setChange(!change);
                    } else {
                      state.style.fill = "#36454f";
                      state.style.stroke = "#536878";
                      state.style.strokeWidth = "2px";
                    }

                    e.target.addEventListener("mouseleave", () => {
                      // state.style.fill='#36454f'
                      //state.style.stroke = '#536878'
                      //state.style.strokeWidth = '2px'
                      setChange(true);
                    });
                    e.target.addEventListener("mouseenter", () => {
                      // state.style.fill='#36454f'
                      //state.style.stroke = '#536878'
                      //state.style.strokeWidth = '2px'
                      setChange(false);
                    });
                  }}
                />
              );
            })}

            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);

              return (
                <>
                  <Tooltip
                    disableFocusListener
                    disableTouchListener
                    title={geo.properties.name}
                  >
                    <g key={geo.rsmKey + "-name"}>
                      {cur && centroid[0] > -160 && centroid[0] < -67 && (
                        <Marker
                          coordinates={centroid}
                          id={geo.properties.name}
                          onClick={(e) => {
                            start();
                            handleOpen();
                            setName({ stateName: cur.id });
                            setStateName({ stateName: geo.properties.name });
                          }}
                          cursor="pointer"
                        >
                          <circle
                            cx="5"
                            cy="5"
                            r={7}
                            fill="#7fffd4"
                            stroke="#006a4e"
                            strokeWidth={1}
                            id={geo.properties.name}
                          />
                          <circle
                            cx="5"
                            cy="5"
                            r={5}
                            fill="white"
                            stroke="black"
                            strokeWidth={1}
                            id="wre"
                          />
                          <circle cx="5" cy="5" r={3} fill="black" id="wre" />
                        </Marker>
                      )}
                      )
                    </g>
                  </Tooltip>
                </>
              );
            })}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ overflow: "auto" }}
            >
              <Box sx={style}>
                <Chart
                  state={name.stateName}
                  name={stateName.stateName}
                  stateData={stateData}
                />
                <ChartGender
                  state={name.stateName}
                  stateData={stateData}
                  name={stateName.stateName}
                />
              </Box>
            </Modal>
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;

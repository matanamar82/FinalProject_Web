import React, { useState, useRef, useEffect } from "react";
import Map from "react-map-gl";
import FetchSelfData from "./FetchSelfData";
import CenterMapBtn from "./CenterMapBtn";
import maplibregl from "maplibre-gl";
import { Button } from "@mui/material";

const MapBox = () => {
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 5,
    pitch: 0,
  });
  const [isCentered, setIsCentered] = useState(true);
  const mapRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        ref={mapRef}
        initialViewState={{
          longitude: 35,
          latitude: 31,
          zoom: 9,
        }}
        style={{ position: "absolute", height: "100%", width: "100vw" }}
        mapStyle="http://localhost:3650/api/maps/israel_1/style.json"
      >
        <FetchSelfData
          isCenter={isCentered}
          center={(lat, lon, zoom, pitch, rot) => {
            setViewState({
              longitude: lon,
              latitude: lat,
              zoom: zoom,
              pitch: pitch,
              bearing: rot,
            });
          }}
          fetchCoordinate={fetchNewData}
          setIsConnect={setIsConnect}
          IsLoaded={isLoaded}
        />
        <CenterMapBtn
          isCenter={isCentered}
          setIsCenter={(value) => setIsCentered(value)}
        />
      </Map>
      <Button
        variant="contained"
        onClick={() => {
          setIsCentered(true);
        }}
        sx={{
          position: "absolute",
          marginLeft: 168,
          marginTop: 1.2,
          zIndex: 1,
        }}
      >
        Align
      </Button>
    </>
  );
};
export default MapBox;
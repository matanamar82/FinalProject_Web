import React, { useState, useRef, useEffect } from "react";
import { Map, Marker, Source, useMap } from "react-map-gl";
import FetchSelfData from "./FetchSelfData";
import CenterMapBtn from "./CenterMapBtn";
import maplibregl from "maplibre-gl";
import EntityLoader from "../EntityLoader";


export const MapBox = ({ fetchFunction, setIsConnect, barOption, barHandler }) => 
{
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 9,
    pitch: 0,
  });
  const [isCentered, setIsCentered] = useState(true);
  const [Point, setPoint] = useState();
  const [cursor, setCursor] = useState('crosshair')
  const mapRef = useRef();
  const map = useMap()
  function stopMap()
  {
    console.log(map)
  };
  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={(evt) => {setViewState(evt.viewState)}}
        onClick={(evt) => setPoint(evt.lngLat)}
        ref={mapRef}
        initialViewState={{
          longitude: 35,
          latitude: 31,
          zoom: 9,
        }}
        cursor={cursor}
        style={{ position: "absolute", height: "100%", width: "100vw"}}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=eyVwLyAoQA708yp277Ye"
      >
        <EntityLoader point={Point} barOption={barOption} stopMap={stopMap} barHandler={barHandler}/>
        <FetchSelfData
          isCenter={isCentered}
          center={(lat, lon, zoom, pitch, rot) =>
          {
            setViewState({
              longitude: lon,
              latitude: lat,
              zoom: zoom,
              pitch: pitch,
              bearing: rot,
            });
          }}
          setIsConnect={setIsConnect}
        />
        <CenterMapBtn
          isCenter={isCentered}
          setIsCenter={(value) => setIsCentered(value)}
        />
      </Map>

    </>
  );
};

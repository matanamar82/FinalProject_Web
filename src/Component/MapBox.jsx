import React, { useState, useRef, useEffect } from "react";
import { Map, Marker, Source } from "react-map-gl";
import FetchSelfData from "./FetchSelfData";
import CenterMapBtn from "./CenterMapBtn";
import maplibregl from "maplibre-gl";

export const MapBox = ({ fetchFunction, setIsConnect }) => 
{
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 9,
    pitch: 0,
  });
  const [isCentered, setIsCentered] = useState(true);
  const [ClickE, setClickE] = useState();
  const mapRef = useRef();
  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={(evt) => 
          setClickE(evt)
        }
        ref={mapRef}
        initialViewState={{
          longitude: 35,
          latitude: 31,
          zoom: 9,
        }}
        cursor="crosshair"
        style={{ position: "absolute", height: "100%", width: "100vw" }}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=eyVwLyAoQA708yp277Ye"
      >
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

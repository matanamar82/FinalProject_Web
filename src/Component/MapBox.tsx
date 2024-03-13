import React, { useState, useRef, useEffect } from "react";
import { Map, Marker, Source, useMap, Popup, MapRef } from "react-map-gl";
import FetchSelfData from "./FetchSelfData";
import CenterMapBtn from "./CenterMapBtn";
import EntityLoader from "../EntityLoader";
import { Position } from "geojson";

type Props = {
  setIsConnect: (option:boolean) => void,
  barOption: string,
  showDialog: (dialogData:any, selfCoordinates:Position, destCoordinates:Position) => void,
  setBarOption: (option:string) => void
}

export const MapBox = ({ setIsConnect, barOption, showDialog, setBarOption }:Props) => 
{
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 9,
    pitch: 0,
  });
  const [isCentered, setIsCentered] = useState<boolean>(true);
  const [Point, setPoint] = useState(null);
  const [cursor, setCursor] = useState('crosshair')
  const mapRef = useRef<MapRef>(null)

  const handlePoint = (coordinates:any) => {
    if(barOption != '')
      setPoint(coordinates);
    else
      setPoint(null);
  }
  return (
    <>
      <Map
        // mapLib={mapboxgl}
        {...viewState}
        onMove={(evt) => {setViewState(evt.viewState)}}
        onClick={(evt) => handlePoint(evt.lngLat)}
        onDblClick={(evt) => alert(evt.lngLat)}
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
        <EntityLoader point={Point} barOption={barOption} showDialog={showDialog} setBarOption={setBarOption}/>
        <FetchSelfData
          isCenter={isCentered}
          center={(lat:number, lon:number, zoom:number, pitch:number, rot:number) =>
          {
            setViewState({
              longitude: lon,
              latitude: lat,
              zoom: zoom,
              pitch: pitch,
            });
          }}
          setIsConnect={setIsConnect}
        />
        <CenterMapBtn
          isCenter={isCentered}
          setIsCenter={(value:boolean) => setIsCentered(value)}
        />
      </Map>

    </>
  );
};

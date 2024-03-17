import { useState, useRef } from "react";
import { Map } from "react-map-gl";
import FetchSelfData from "./FetchSelfData";
import CenterMapBtn from "./CenterMapBtn";
import EntityLoader from "../EntityLoader";
import MapLibreGL from "maplibre-gl";

export const MapBox = ({ setIsConnect, barOption, showDialog }) => 
{
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 9,
    pitch: 0,
  });
  const [isCentered, setIsCentered] = useState(true);
  const [Point, setPoint] = useState(null);
  const [cursor, setCursor] = useState('crosshair')
  const mapRef = useRef(null)

  const handlePoint = (coordinates) => {
    if(barOption != '')
      setPoint(coordinates);
    else
      setPoint(null);
  }
  return (
    <>
      <Map
        mapLib={MapLibreGL}
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
        <EntityLoader point={Point} showDialog={showDialog}/>
        <FetchSelfData
          isCenter={isCentered}
          center={(lat, lon, zoom, pitch, rot) =>
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
          setIsCenter={(value) => setIsCentered(value)}
        />
      </Map>

    </>
  );
};

import { useState, useRef, useEffect } from "react";
import { Map } from "react-map-gl";
import FetchSelfData from "./FetchSelfData";
import CenterMapBtn from "./CenterMapBtn";
import EntityLoader from "../EntityLoader";
import MapLibreGL from "maplibre-gl";
import { useDispatch } from "react-redux";
import { useMapUtils } from "../hooks/useMapUtils";
import EntitiesMenu from "./EntitiesWindows/EntitiesMenu";

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
  const [FeaturesAroundPoint, setFeaturesAroundPoint] = useState([]);
  const [EntitiesPositions, setEntitiesPositions] = useState({x: 0, y: 0})
  const [OpenMenu, setOpenMenu] = useState(false);
  const mapRef = useRef(null)
  const [EntitiesMenusCounter, SetCounter] = useState(0);
  const { getFeaturesAroundPoint } = useMapUtils()

  const DecreaseMenuesCounter = () => {
    console.log("decrease")
    if(EntitiesMenusCounter - 1 == 0)
    {
      setOpenMenu(false)
      console.log("zero")
    }
    SetCounter(EntitiesMenusCounter - 1);
  }
  const handlePoint = (coordinates) =>
  {
    if (barOption != '')
      setPoint(coordinates);
    else
      setPoint(null);
  }

  const EntitiesMenuHandle = (mapRef, point) => 
  {
    console.log(point)
    const Features = getFeaturesAroundPoint(mapRef, point);
    if(Features.length != 0)
    {
      console.log(Features);
      setFeaturesAroundPoint(Features);
      setOpenMenu(true)
      const Positions = []
      Features.forEach(feature => {
        if(feature.geometry.type === 'Point')
          Positions.push(mapRef.project(feature.geometry.coordinates))
        else if (feature.geometry.type === 'LineString')
          Positions.push(mapRef.project(feature.geometry.coordinates[0]))
      })
      SetCounter(Features.length)
      setEntitiesPositions(Positions)
    }
    else
      setFeaturesAroundPoint([])
  }
  return (
    <>
      <Map
        mapLib={MapLibreGL}
        ref={mapRef}
        {...viewState}
        initialViewState={{
          longitude: 35,
          latitude: 31,
          zoom: 9,
        }}
        cursor={cursor}
        style={{ position: "absolute", height: "100%", width: "100vw" }}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=eyVwLyAoQA708yp277Ye"
        onMove={(evt) => { setViewState(evt.viewState) }}
        onClick={(evt) => handlePoint(evt.lngLat)}
        onDblClick={(evt) => EntitiesMenuHandle(mapRef.current, evt.point)}
        doubleClickZoom={false}
      >
        <EntityLoader point={Point} showDialog={showDialog} />
        {OpenMenu && EntitiesPositions.map((Entity) => <EntitiesMenu Entity={Entity} DecreaseMenuesCounter={DecreaseMenuesCounter}/>)}
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

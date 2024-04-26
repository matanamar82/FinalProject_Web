import { useMap, Source, Layer, SymbolLayer, LineLayer } from "react-map-gl";
import { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import selfPlane from '../Assets/Plane1.png'
import { Feature, Position } from "geojson";
import { Noodle } from "./Noodle";
import { useDispatch } from "react-redux";
import { setSelfData } from "../state/slices/SelfDataSlice";


const selfDataClient = new W3CWebSocket("ws://localhost:5500/SelfData");

const FetchSelfData = ({ center, isCenter, setIsConnect }: any) => {
  const currMap = useMap().current;
  const isCenterRef = useRef();
  isCenterRef.current = isCenter;
  const dispatch = useDispatch();

  useEffect(() => {
    loadImage()
  }, []);

  const loadImage = () => {
    if (currMap) {
      currMap.loadImage(selfPlane,
        function (error, image) {
          if (error) {
            console.error('Error loading image:', error);
            return;
          }

          if (image) {
            if (!currMap.hasImage("selfPlane")) {
              currMap.addImage("selfPlane", image);
            }
          }
          else {
            console.error('Image is undefined');
          }

        });
      fetchForSelfData();
    }
  }
  const fetchForSelfData = () => {
    // console.log(currMap?.listImages())
    console.log("trying to connect to SelfData");
    selfDataClient.onopen = () => {
      console.log("Client Connected to SelfData!");
    };
    selfDataClient.onmessage = (message) => {
      const data = JSON.parse(message.data.toString());
      dispatch(setSelfData(data))
      // console.log("data from 65 line: ")
      // console.log(data);
      setSelfDataSource({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            data.Position.Longitude,
            data.Position.Latitude,
          ],
        },
        properties: {
          callSign: data.CallSign,
          trueTrack: data.TrueTrack,
        },
      });
      if (isCenterRef.current) {
        center(
          data.Position.Latitude,
          data.Position.Longitude,
          9,
          0,
          data.TrueTrack
        );
      }
      // console.log(data.TrueTrack)
      dispatch(setSelfData(data))
      const { NoodleCalc } = Noodle();
      const NoodleArr: Position[] = NoodleCalc(data)
      
      const parsedData: Feature = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [...NoodleArr],
        },
        properties: {}
      };
      setNoodleSource(parsedData);
    };
    selfDataClient.onclose = () => {
      setIsConnect(false);
      setTimeout(fetchForSelfData, 10);
    };
  };

  const [selfDataSource, setSelfDataSource] = useState<Feature>({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [],
    },
    properties: {},
  });

  const selfDataLayer: SymbolLayer = {
    id: "selfData",
    type: "symbol",
    source: "selfData",
    layout: {
      "icon-allow-overlap": true,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "trueTrack"],
      "icon-image": 'selfPlane',
      "icon-size": 0.02,
    },

  };

  const [noodleSource, setNoodleSource] = useState<Feature>({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
    properties: {},
  });

  const [noodleLayer, setNoodleLayer] = useState<LineLayer>({
    id: "noodle",
    type: "line",
    source: "noodle",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": 'black',
      "line-width": 4,
    },
  });

  return (
    <>
      <Source id="selfData" type="geojson" data={selfDataSource}>
        <Layer {...selfDataLayer} />
      </Source>
      <Source id="noodle" type="geojson" data={noodleSource}>
        <Layer {...noodleLayer} />
      </Source>
    </>
  );
};

export default FetchSelfData;
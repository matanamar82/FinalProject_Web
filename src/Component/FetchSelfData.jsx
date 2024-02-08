import { useMap, Source, Layer } from "react-map-gl";
import { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import selfPlane from "../Assets/Plane1.png"


const selfDataClient = new W3CWebSocket("ws://localhost:5500/SelfData");

const FetchSelfData = ({
  center,
  isCenter,
  setIsConnect,
}) => {
  const { current: currMap } = useMap();
  const isCenterRef = useRef();

  isCenterRef.current = isCenter;
  const [selfDataSource, setSelfDataSource] = useState({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [],
    },
    properties: {},
  });

  const selfDataLayer = {
    id: "selfData",
    type: "symbol",
    url: "../Assets/Plane1.png",
    source: "selfData",
    layout: {
      "icon-allow-overlap": true,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "trueTrack"],
      "icon-image": "selfPlane",
      "icon-size": 0.02,
    },
  };

  useEffect(() => {
    currMap?.loadImage(selfPlane, 
    function (error, image) 
    {
      if (error) {
        console.error('Error loading image:', error);
        return;
      }
  
      if (image) {
        currMap.addImage("selfPlane", image);
      } else {
        console.error('Image is undefined');
      }
    });
    fetchForSelfData();
  }, []);

  const fetchForSelfData = () => {
      console.log("trying to connect to SelfData");
      selfDataClient.onopen = () => {
        console.log("Client Connected to SelfData!");
      };
      selfDataClient.onmessage = (message) => {        
        const data = JSON.parse(message.data);
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
        console.log(data.TrueTrack);
        if (isCenterRef.current) {
          center(
            data.Position.Latitude,
            data.Position.Longitude,
            9,
            0,
            data.TrueTrack
          );
        }
      };
      selfDataClient.onclose = () => {
        setIsConnect(false);
        setTimeout(fetchForSelfData, 10);
      };
  };

  
  return (
    <>
      <Source id="selfData" type="geojson" data={selfDataSource}>
        <Layer {...selfDataLayer} />
      </Source>
    </>
  );
};

export default FetchSelfData;
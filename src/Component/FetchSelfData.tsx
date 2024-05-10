import { useMap, Source, Layer } from "react-map-gl";
import { useEffect, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import selfPlane from '../Assets/Plane1.png'
import { Feature } from "geojson";
import { Noodle } from "./Noodle";
import { useDispatch, useSelector } from "react-redux";
import { setSelfData } from "../state/slices/SelfDataSlice";
import { noodleLayer } from "../layers/NoodleLayer";
import { selfDataLayer } from "../layers/selfDataLayer";
import { RootState } from "../state/stores/Store";
import { setNoodle, setSelfDataSource, } from "../state/slices/NoodleSlice";
import { directLayer } from "../layers/DirectLayer";


const selfDataClient = new W3CWebSocket("ws://localhost:5500/SelfData");

const FetchSelfData = ({ center, isCenter, setIsConnect }: any) => {
  const currMap = useMap().current;
  const isCenterRef = useRef();
  isCenterRef.current = isCenter;
  const NoodleArr = useSelector((state: RootState) => state.NoodleSlice.Noodle)
  const SelfData = useSelector((state: RootState) => state.NoodleSlice.SelfDataSource)
  const DirectArr = useSelector((state: RootState) => state.NoodleSlice.Direct)
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
      dispatch(setSelfDataSource({
        coordinates: [data.Position.Longitude, data.Position.Latitude],
        callSign: data.CallSign,
        trueTrack: data.TrueTrack
      }))
      if (isCenterRef.current) {
        center(
          data.Position.Latitude,
          data.Position.Longitude,
          9,
          0,
          data.TrueTrack
        );
      }
      const { NoodleCalc } = Noodle();
      dispatch(setNoodle(NoodleCalc(data)))
    };
    selfDataClient.onclose = () => {
      setIsConnect(false);
      setTimeout(fetchForSelfData, 10);
    };
  };

  const selfDataSource: Feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: SelfData.coordinates,
    },
    properties: {
      callSign: SelfData.callSign,
      trueTrack: (SelfData.trueTrack * (Math.PI / 180))

    },
  };

  const noodleSource: Feature = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: NoodleArr,
    },
    properties: {},
  };

  const directSource: Feature = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: DirectArr,
    },
    properties: {}
  }
  return (
    <>
      <Source id="selfData" type="geojson" data={selfDataSource}>
        <Layer {...selfDataLayer} />
      </Source>
      <Source id="noodle" type="geojson" data={noodleSource}>
        <Layer {...noodleLayer} />
      </Source>
      <Source id="direct" type="geojson" data={directSource}>
        <Layer {...directLayer} />
      </Source>
    </>
  );
};

export default FetchSelfData;
import { useMap, Source, Layer } from "react-map-gl";
import { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';


const selfDataClient = new W3CWebSocket("ws://localhost:5500/Echo");

let AreaData:any = undefined;
let showNoodle = true;
const FetchSelfData = ({
//   center,
//   isCenter,
//   fetchCoordinate,
//   setIsConnect,
//   //IsLoaded,
// }: {
//     center:any,
//     isCenter:any,
//     fetchCoordinate:any,
//     setIsConnect:any,
//     //IsLoaded:any
 }) => {
//   const { current: currMap } = useMap();
//   const [isFetchingSelfData, setIsFetchingSelfData] = useState(false);
//   const isCenterRef = useRef();

//   isCenterRef.current = isCenter;

//   const selfDataLayer = {
//     id: "selfData",
//     type: "symbol",
//     url: "../Assets/Plane1.png",
//     source: "selfData",
//     layout: {
//       "icon-allow-overlap": true,
//       "icon-rotation-alignment": "map",
//       "icon-rotate": ["get", "trueTrack"],
//       "icon-image": "selfPlane",
//       "icon-size": 0.1,
//     },
//   };

//   useEffect(() => {
//     currMap.loadImage(require("./assets/Plane1.png"), function (error, image) {
//       currMap.addImage("selfPlane", image);
//     });
//     fetchForSelfData();
//   }, []);

//   const fetchForSelfData = () => {
//     if (!isFetchingSelfData ) {
//       setIsFetchingSelfData(true);
//       console.log("trying to connect to SelfData");
//       selfDataClient.onopen = () => {
//         console.log("Client Connected to SelfData!");
//       };
//       selfDataClient.onmessage = (message : any) => {        
//         const data = JSON.parse(message.data);
        
//         if (isCenterRef.current) {
//           center(
//             data.CurrData.Position.Latitude,
//             data.CurrData.Position.Longitude,
//             9,
//             0,
//             data.CurrData.TrueTrack
//           );
//         }
//       };
//       selfDataClient.onclose = () => {
//         setIsConnect(false);
//         setTimeout(fetchForSelfData, 10);
//       };
//     }   
//   };


  return (
    <>
    </>
  );
};

export default FetchSelfData;
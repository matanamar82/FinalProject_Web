import { useEffect, useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { PathDialog } from './Component/PathDialog';
import { ElevationTypes } from './types/ElevationObj';
import { MapBox } from './Component/MapBox';
import { useMapEventListener } from './hooks/useMapEventListener';
import LandingZoneDialog from "./Component/LandingZoneDialog";

// import { Heights } from './Component/Heights';

function App() {
  const [coordinateData, setCoordinateData] = useState(undefined);
  const coordinatesTransfer = (data: any) => {
    setCoordinateData(data);
  }

  const [IsConnect, setIsConnect] = useState(false);
  const [src, SetSrc] = useState<string>();
  const [dest, SetDest] = useState<string>();
  const [location, SetLocation] = useState<string>("");
  const [elevationsArr, setElevation] = useState<ElevationTypes[]>([]);

  const setPoints = (src_lon: number, src_lat: number, dest_lon: number, dest_lat: number) => {
    var Src = `${src_lat},${src_lon}`
    var Dest = `${dest_lat},${dest_lon}`
    DialogMod()
    console.log(Src, Dest)
    SetLocation(`${Src}|${Dest}`)
  }
  // fetch elevations ----------------------------------------------
  useEffect(() => {
    if (location != "") {
      console.log(`new location: ${location}`)
      fetch(`http://localhost:5000/api/${location}`)
        .then(res => res.json())
        .then(data => {
          try {
            const elevationObj = data.data;
            ;
            if (elevationObj.status == "OK") {
              console.log("fucking good")
              const results = elevationObj.results;
              console.log(results)
              setElevation([...elevationsArr, ...results]);
            }
            else {
              console.log("fucking Error")
            }
            console.log("Raw data from API:", elevationObj)
          }
          catch {
            console.log(data.error);
          }
        });
    }
  }, [location]);

  useEffect(() => {
    if (elevationsArr.length > 0) {
      var i = 0
      elevationsArr.forEach(elevationObj => {
        console.log(`elevationObj_${i++}:`, elevationObj.elevation);
      })
    }
  }, [elevationsArr]);

  //------------------------------------------------------------------

  const [openDialog, SetOpen] = useState<boolean>(false);
  function DialogMod() {
    SetOpen(!openDialog);
    console.log(openDialog)
  }
  const [ShowHeights, SetShowHeight] = useState<boolean>(false)
  function ShowHeightMod() {
    SetShowHeight(!ShowHeights)
  }
  const [barOption, setBarOption] = useState<string>('');
  function barHandler(optionType: string){
    console.log(optionType)
    setBarOption(optionType)
  }
  useMapEventListener();
  return (
    <div className="App">
      <Bar DialogMod={DialogMod} ShowHeightMod={ShowHeightMod} barHandler={barHandler}/>
      {openDialog && <PathDialog Open={openDialog} DialogMod={DialogMod} setPoints={setPoints} />}
      <MapBox fetchFunction={coordinatesTransfer} setIsConnect={setIsConnect} barOption={barOption} barHandler={barHandler}/>
      {/* <LandingZoneDialog /> */}
      {/* {ShowHeights && <Heights ShowHeights={ShowHeights} ShowHeightMod={ShowHeightMod}/>} */}
    </div>
  );
}

export default App;

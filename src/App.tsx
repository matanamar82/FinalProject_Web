import { useEffect, useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import { useMapEventListener } from './hooks/useMapEventListener';
import LandingZoneDialog from "./Component/LandingZoneDialog";
import { Position } from 'geojson';

// import { Heights } from './Component/Heights';

function App() {
  const [IsConnect, setIsConnect] = useState(false);
  const [elevationsArr, setElevations] = useState<number[]>([])
  const [distancesArr, setDistances] = useState<number[]>([]) 
  const [landingZoneDistance, setLandingZoneDistance] = useState<number>(0);
  const [openDialog, SetOpen] = useState<boolean>(false);
  const [ShowHeights, SetShowHeight] = useState<boolean>(false)
  const [barOption, setBarOption] = useState<string>('');
  const [selfCoordinates, setSelfCoordinates] = useState<Position>([])
  const [destCoordinates, setDestCoordinates] = useState<Position>([])

  useEffect(() => {
    if(elevationsArr.length > 0 && distancesArr.length > 0)
      DialogMod(true)
  },[elevationsArr, distancesArr])
  function showDialog(dialogData:any, selfCoordinates:Position, destCoordinates:Position)
  {
    dialogData.then((res: any) => {
      console.log(`dialog data is:`)
      console.log(res)
      setElevations(res.avgArr)
      setDistances(res.distanceArr)
      setLandingZoneDistance(res.longDistance)
    })
    setSelfCoordinates(selfCoordinates)
    setDestCoordinates(destCoordinates)
  };
  function DialogMod(mod:boolean) {
    SetOpen(mod);
  }
  function ShowHeightMod() {
    SetShowHeight(!ShowHeights)
  }

  function barHandler(optionType: string){
    console.log(optionType)
    setBarOption(optionType)
  }
  useMapEventListener();
  return (
    <div className="App">
      <Bar DialogMod={DialogMod} ShowHeightMod={ShowHeightMod} barHandler={barHandler}/>
      <MapBox 
        setIsConnect={setIsConnect} 
        barOption={barOption} 
        barHandler={barHandler}
        showDialog={showDialog}
      />
      {openDialog && <LandingZoneDialog 
                      elevationsArr={elevationsArr} 
                      distancesArr={distancesArr} 
                      distance={landingZoneDistance}
                      selfCoordinates={selfCoordinates}
                      destCoordinates={destCoordinates}
                      DialogMod={DialogMod}
                      />
      }
    </div>
  );
}

export default App;

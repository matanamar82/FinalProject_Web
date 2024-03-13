import { useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import LandingZoneDialog from "./Component/LandingZoneDialog";
import { Position } from 'geojson';
import { LandingZoneDialogPropsType } from './types/LandingZoneDialogTypes';

function App() {
  const [IsConnect, setIsConnect] = useState<boolean>(false);
  const [DialogsArr, setDialogsArr] = useState<LandingZoneDialogPropsType[]>([]) // מערך של כל המנחתים שבחרנו
  const [openDialog, SetOpen] = useState<boolean>(false);
  const [barOption, setBarOption] = useState<string>('');

  function showDialog(dialogData:any, selfCoordinates:Position, destCoordinates:Position)
  {
    dialogData.then((res: any) => {
      console.log(`dialog data is:`)
      console.log(res)
      const dialog:LandingZoneDialogPropsType = {
        elevationsArr: res.avgArr,
        distancesArr: res.distanceArr,
        distance: res.longDistance,
        selfCoordinates: selfCoordinates,
        destCoordinates: destCoordinates
      };
      setDialogsArr([...DialogsArr, dialog])
      SetOpen(true);
    })
  };

  return (
    <div className="App">
      <Bar setBarOption={setBarOption}/>
      <MapBox 
        setIsConnect={setIsConnect} 
        barOption={barOption} 
        showDialog={showDialog}
        setBarOption={setBarOption}
      />
      {openDialog && <LandingZoneDialog dialog={DialogsArr[DialogsArr.length-1]} SetOpen={SetOpen}/>}
    </div>
  );
}

export default App;

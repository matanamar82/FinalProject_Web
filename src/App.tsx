import { useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import LandingZoneDialog from "./Component/LandingZoneDialog";
import { Position } from 'geojson';
import { LandingZoneDialogPropsType } from './types/LandingZoneDialogTypes';
import { useSelector } from 'react-redux';
import { RootState } from './state/stores/Store';

function App() {
  const Option = useSelector((state: RootState) => state.pinMode.option);

  const [IsConnect, setIsConnect] = useState<boolean>(false);
  const [DialogsArr, setDialogsArr] = useState<LandingZoneDialogPropsType[]>([]) // מערך של כל המנחתים שבחרנו
  const [openDialog, SetOpen] = useState<boolean>(false);

  function showDialog(dialogData: any, selfCoordinates: Position, destCoordinates: Position) {
    dialogData.then((res: any) => {
      console.log(`dialog data is:`)
      console.log(res)
      const dialog: LandingZoneDialogPropsType = {
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
      <Bar/>
      <MapBox
        setIsConnect={setIsConnect}
        barOption={Option}
        showDialog={showDialog}
      />
      {openDialog && <LandingZoneDialog dialog={DialogsArr[DialogsArr.length - 1]} SetOpen={SetOpen} />}
    </div>
  );
}

export default App;

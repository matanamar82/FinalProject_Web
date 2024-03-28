import { useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import LandingZoneDialog from "./Component/EntitiesWindows/LandingZoneDialog";
import { Position } from 'geojson';
import { LandingZoneDialogPropsType } from './types/LandingZoneDialogTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/stores/Store';
import EntitiesMenu from './Component/EntitiesWindows/EntitiesMenu';
import { AddDialog } from './state/slices/DialogsSlice';
import useCreateDialog from './hooks/useCreateDialog';

function App() {
  const Option = useSelector((state: RootState) => state.pinMode.option);
  const Dialogs = useSelector((state: RootState) => state.dialogs.Dialogs);

  const [IsConnect, setIsConnect] = useState<boolean>(false);
  const [DialogsArr, setDialogsArr] = useState<LandingZoneDialogPropsType[]>([]) // מערך של כל המנחתים שבחרנו
  const [openDialog, SetOpen] = useState<boolean>(false);
  const {CreateDialog} = useCreateDialog();
  const dispatch = useDispatch();

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
      CreateDialog(dialog)
      // dispatch(AddDialog({Dialog: dialog}))
      setDialogsArr([...DialogsArr, dialog])
      SetOpen(true);
    })
  };

  return (
    <div className="App">
      <Bar />
      <MapBox
        setIsConnect={setIsConnect}
        barOption={Option}
        showDialog={showDialog}
      />
      {openDialog && <LandingZoneDialog dialog={DialogsArr[DialogsArr.length - 1]} SetOpen={SetOpen} />}
      {/* <EntitiesMenu /> */}
    </div>
  );
}

export default App;

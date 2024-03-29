import { useEffect, useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import { Position } from 'geojson';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/stores/Store';
import EntitiesMenu from './Component/EntitiesWindows/EntitiesMenu';
import { AddDialog, OpenDialog } from './state/slices/DialogsSlice';
import useCreateDialog from './hooks/useCreateDialog';
import { Dialog, LandingZoneProps } from './types/DialogTypes';
import { entityTypes } from './types/EntityTypes';
import DialogComponent from './Component/EntitiesWindows/DialogComponent';

function App() {
  const Option = useSelector((state: RootState) => state.pinMode.option);
  const Dialogs = useSelector((state: RootState) => state.dialogs.Dialogs);
  const openDialog = useSelector((state: RootState) => state.dialogs.isOpen);
  const [IsConnect, setIsConnect] = useState<boolean>(false);
  const [Dialog, setDialog] = useState<Dialog>() // מערך של כל המנחתים שבחרנו
  const {CreateDialog} = useCreateDialog();
  const dispatch = useDispatch();

  function showDialog(dialog: any) {
    dialog.then((res: any) => {
      console.log(res)
      const Dialog:Dialog = CreateDialog(res)
      // dispatch(AddDialog({Dialog: dialog}))
      setDialog(Dialog)
      dispatch(OpenDialog());
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
      {openDialog && Dialog && <DialogComponent dialog={Dialog} />}
    </div>
  );
}

export default App;

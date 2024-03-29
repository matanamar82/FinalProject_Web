import { useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/stores/Store';
import { AddDialog } from './state/slices/DialogsSlice';
import useCreateDialog from './hooks/useCreateDialog';
import { Dialog } from './types/DialogTypes';
import DialogComponent from './Component/EntitiesWindows/DialogComponent';

function App() {
  const Option = useSelector((state: RootState) => state.pinMode.option);
  // const Dialogs = useSelector((state: RootState) => state.dialogs.Dialogs);
  const DialogIsOpen = useSelector((state: RootState) => state.dialogs.isOpen);
  const [IsConnect, setIsConnect] = useState<boolean>(false);
  const CurrentDialog = useSelector((state: RootState) => state.dialogs.CurrentDialog) 
  const {CreateDialog} = useCreateDialog();
  const dispatch = useDispatch();

  function showDialog(dialog: any) {
    dialog.then((res: any) => {
      console.log(res)
      const Dialog:Dialog = CreateDialog(res)
      dispatch(AddDialog(Dialog))
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
      {DialogIsOpen && CurrentDialog && <DialogComponent dialog={CurrentDialog} />}
    </div>
  );
}

export default App;

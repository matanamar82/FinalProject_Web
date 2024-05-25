import { useState } from 'react';
import './App.css';
import { Bar } from './Component/Bar';
import { MapBox } from './Component/MapBox';
import { useSelector } from 'react-redux';
import { RootState } from './state/stores/Store';
import DialogComponent from './Component/EntitiesWindows/DialogComponent';

function App() {
  const Option = useSelector((state: RootState) => state.pinMode.option);
  const DialogIsOpen = useSelector((state: RootState) => state.dialogs.isOpen);
  const [IsConnect, setIsConnect] = useState<boolean>(false);
  const CurrentDialog = useSelector((state: RootState) => state.dialogs.CurrentDialog) 
  return (
    <div className="App">
      <Bar />
      <MapBox
        setIsConnect={setIsConnect}
        barOption={Option}
      />
      {DialogIsOpen && CurrentDialog && <DialogComponent dialog={CurrentDialog} />}
    </div>
  );
}

export default App;

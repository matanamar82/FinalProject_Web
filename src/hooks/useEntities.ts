import { useSelector } from "react-redux";
import { RootState } from "../state/stores/Store";

const useEnities = () => {
    const Wpts = useSelector((state: RootState) => state.Entity.Wpts);
    const LandingZones = useSelector((state: RootState) => state.Entity.LandingZones);
    
    return {Wpts, LandingZones}
}

export default useEnities;
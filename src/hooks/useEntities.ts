import { useSelector } from "react-redux";
import { RootState } from "../state/stores/Store";

const useEnities = () => {
    const Wpts = useSelector((state: RootState) => state.Entity.Wpts);
    const FlightLegs = useSelector((state: RootState) => state.Entity.FlightLegs);
    
    return {Wpts, FlightLegs}
}

export default useEnities;
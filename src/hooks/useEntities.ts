import { useSelector } from "react-redux";
import { RootState } from "../state/stores/Store";
import { Position } from "geojson";

const useEnities = () => {
    const Wpts = useSelector((state: RootState) => state.Entity.Wpts);
    const LandingZones = useSelector((state: RootState) => state.Entity.LandingZones);
    
    const FindPoint = (Point:any) => {
        const coordinates:Position = [Point.lat, Point.lng]
        let FeatureAroundPoint:Position = [];
        // FeatureAroundPoint.push(Wpts.find(wpt => {})) 
    }
    return {Wpts, LandingZones}
}

export default useEnities;
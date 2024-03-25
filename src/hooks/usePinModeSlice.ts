import { useSelector } from "react-redux";
import { RootState } from "../state/stores/Store";

const usePinModeSlice = () => {
    const Option = useSelector((state: RootState) => state.pinMode.option);
    const ClicksAmount = useSelector((state: RootState) => state.pinMode.numberOfClicks);
    const points = useSelector((state: RootState) => state.pinMode.points);

    return {Option, ClicksAmount, points}
}

export default usePinModeSlice;
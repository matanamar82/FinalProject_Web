import { PointTypes } from "../types/PointTypes"
import { SelfData } from "./Dto";
import 'geolib'
import { GeoCoordinate } from "./GeoCoordinate";
import { computeDestinationPoint, getDistance, getRhumbLineBearing } from "geolib";


export const noodle = () => {
    const AmountOfPoints: number = 30;
    let Period: number = 2;
    const ToDegrees: number = 180 / Math.PI;
    const ToRadian: number = Math.PI / 180;
    const gravity: number = 9.81;
    const MaxAngleToDirect = 20;
    let Points:PointTypes[] = [];
    let selfData:SelfData;
    let Noodle:any = [];
    let RollAngle:number;
    
    function NoodleCalc(currData:SelfData):GeoCoordinate[]
    {
        selfData = currData;
        return CreateNoodle();
    }

    function CreateNoodle():GeoCoordinate[]
    {
        CalculateNoodle();
        for(let i = 0; i < AmountOfPoints; i++)
            Noodle[i + 1] = computeDestinationPoint(selfData.Position, GetCartesianDistance(Points[i]), selfData.TrueHeading + GetCartesianAzim(Points[i]));
        Noodle[0] = selfData.Position;

        return Noodle;
    }
    
    function CalculateNoodle():void{
        let rateOfTurn:number = GetRateOfTurn();
        let turnRadios:number = GetTurnRadios(rateOfTurn);
        let Thetta : number = ToRadian * ((selfData.TrueHeading) - (selfData.WindAzimuth + 180)); // זווית הפגיעה של הרוח במטוס

        for (let i = 0, t = Period; i < AmountOfPoints; ++i, t+= Period)
        {
            const Beta:number = (Math.abs(t * selfData.RateOfTurn * ToRadian));
            if(Math.abs(selfData.RateOfTurn) < 0.001)
            {
                Points[i] = {X: 0, Y: selfData.GroundSpeed * t}
            }
            else
            {
                Points[i] = {X:Math.sign(rateOfTurn) * turnRadios * (1 - Math.cos(Beta)), Y:turnRadios * Math.sin(Beta)}
            }
            const r:number = Math.abs(selfData.WindSpeed) * t;// העתק קרקעי כתוצאה מהרוח,  - מרחק הסטה בעקבות מהירות הרוח

            Points[i].X += (-r * Math.sin(Thetta))
            Points[i].Y += (r * Math.cos(Thetta))
        }        
    }
    
    function SetTurnFromSelfData():void{
        RollAngle = selfData.RollAngle;
    }

    function GetRateOfTurn():number
    {
        return (gravity * Math.tan(Math.abs(selfData.RollAngle) * ToRadian) * ToDegrees) / selfData.GroundSpeed; 
    }

    function GetTurnRadios(rateOfTurn:number):number{
        return (selfData.TrueAirSpeed) / Math.abs(rateOfTurn * ToRadian)
    }

    function GetCartesianAzim(point:PointTypes):number{
        if (point.Y < 0)
            return ToDegrees * (Math.sign(point.X) * ((Math.PI / 2) + Math.atan(Math.abs(point.Y / point.X))))
        return ToDegrees * Math.atan(point.X / point.Y)
    }

    function GetCartesianDistance(point:PointTypes):number{
        return Math.sqrt(Math.pow(point.Y, 2) + Math.pow(point.X, 2))
    }

    const FindShortestPath = (target:GeoCoordinate):GeoCoordinate[] => {
        const AmountOfPoints:number = 30;
        Period = 150 / AmountOfPoints;

        let diffAzim:number = (360 + (getRhumbLineBearing(selfData.Position, target) - selfData.TrueHeading)) % 360
        if(diffAzim > 0 && diffAzim < 180)
            RollAngle = 20;
        else
            RollAngle = -20;
        let turnRadios = GetTurnRadios(GetRateOfTurn());

        if (getDistance(selfData.Position, target) < 2 * turnRadios)
        {
            const GeoCoordinateArr:GeoCoordinate[] = [(selfData.Position, target)]
            return GeoCoordinateArr;
        }
        const tempNoodle:GeoCoordinate[] = CreateNoodle();
        let noodle:GeoCoordinate[] = [];
        let isFound:boolean = false;
        for(let i = 0; i < AmountOfPoints - 1; i += 2)
        {
            noodle.push(tempNoodle[i]);
            noodle.push(tempNoodle[i + 1]);

            let lineAngle = getRhumbLineBearing(tempNoodle[i], tempNoodle[i + 1]);
            let targetAngle = getRhumbLineBearing(tempNoodle[i + 1], target);
            let lineToTargetAngle = Math.abs(lineAngle - targetAngle);
            
            if (lineToTargetAngle < MaxAngleToDirect)
            {
                isFound = !isFound;
                break;
            }
        }

        if (!isFound){
            const Coordinates:GeoCoordinate[] = [(selfData.Position, target)]
            return Coordinates;
        }

        noodle.push(target);
        return noodle 
    }
    return NoodleCalc;
}
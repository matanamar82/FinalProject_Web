import { useState } from "react";
import { PointTypes } from "../types/PointTypes"
import { SelfData } from "./Dto";
import 'geolib'


export const noodle = () => {
    const AmountOfPoints: number = 30;
    const Period: number = 2;
    const ToDegree: number = 180 / Math.PI;
    const ToRadian: number = Math.PI / 180;
    const gravity: number = 9.81;
    const [Radius, setRadius] = useState<number>(0);
    var PointsArr:PointTypes[] = [];
    var CurrData:SelfData;
    var Noodle:any = []
    function NoodleCalc(currData:SelfData):void
    {
        CurrData = currData;
        CreateNoodle();
    }

    function CreateNoodle():void
    {
        var Thetta : number = ToRadian * ((CurrData.TrueHeading) - (CurrData.WindAzimuth + 180));
        for(let i:number = 0, t:number = 2; i< AmountOfPoints; i++, t += Period)
        {
            const Beta:number = (Math.abs(t * CurrData.RateOfTurn * ToRadian));
            if(Math.abs(CurrData.RateOfTurn) < 0.001)
            {
                PointsArr[i] = {X: 0, Y: CurrData.GroundSpeed * t}
            }
            else
            {
                PointsArr[i] = {X:Math.sign(CurrData.RateOfTurn * Radius * (1 - Math.cos(Beta))), Y:Radius * Math.sin(Beta)}
            }
            const r:number = Math.abs(CurrData.WindSpeed) * t;

            PointsArr[i].Y += r * Math.cos(Thetta);
            PointsArr[i].X += -r * Math.sin(Thetta);
            // Noodle[i + 1] = 
        }
        Noodle[0] = CurrData.Position
    }
    

    function GetRadios():void
    {
        setRadius(CurrData.GroundSpeed / Math.abs(CurrData.RateOfTurn * ToRadian));
    }
    
    function GetRateOfTurn():void
    {
        CurrData.RateOfTurn = (gravity * Math.tan(Math.abs(CurrData.RollAngle) * ToRadian) * ToDegree) / CurrData.GroundSpeed; 
    }


}
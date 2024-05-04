import { PointTypes } from "../types/PointTypes"
import { SelfData } from "./Dto";
import 'geolib'
import { computeDestinationPoint, getDistance, getRhumbLineBearing } from "geolib";
import { Position } from "geojson";
import { GeolibInputCoordinates } from "geolib/es/types";
import { GeolibCoordinate } from "./GeoCoordinate";

export const Noodle = () => {
    const AmountOfPoints: number = 30;
    let Period: number = 2;
    const ToDegrees: number = 180 / Math.PI;
    const ToRadian: number = Math.PI / 180;
    const gravity: number = 9.81;
    const MaxAngleToDirect = 20;
    let Points: PointTypes[] = [];
    let SelfData: SelfData = {
        Position: { Latitude: 0, Longitude: 0 },
        CallSign: "Samson",
        TrueAirSpeed: 100,
        RateOfTurn: 0,
        RollAngle: 30,
        AltitudeRate: 0,
        WindSpeed: 5,
        WindAzimuth: 90,
        TrueTrack: 360,
        TrueHeading: 0,
        Altitude: 0,
        PitchAngle: 0,
        GroundSpeed: 100,
    };
    let Noodle: Position[] = [];
    let RollAngle: number;
    let SelfPosition: GeolibInputCoordinates = { latitude: 0, longitude: 0 };

    function NoodleCalc(currData: SelfData): Position[] {
        SelfData = currData
        SelfPosition = { latitude: SelfData.Position.Latitude, longitude: SelfData.Position.Longitude }
        // console.log(SelfData)
        // console.log(SelfPosition)
        return CreateNoodle();
    }

    function CreateNoodle(): Position[] {
        RollAngle = SelfData.RollAngle;
        CalculateNoodle();
        Noodle.push([SelfData.Position.Longitude, SelfData.Position.Latitude])
        for (let i = 0; i < AmountOfPoints; i++) {
            const Distance: number = GetCartesianDistance(Points[i]);
            const Bearing: number = SelfData.TrueHeading + GetCartesianAzim(Points[i])
            const NextPoint: GeolibInputCoordinates = computeDestinationPoint(
                SelfPosition,
                Distance,
                Bearing
            )
            Noodle.push([Number(NextPoint.longitude), Number(NextPoint.latitude)])
        }
        return Noodle;
    }

    function CalculateNoodle(): void {
        let rateOfTurn: number = GetRateOfTurn();
        let turnRadios: number = GetTurnRadios(rateOfTurn);
        let Thetta: number = ToRadian * ((SelfData.TrueHeading) - (SelfData.WindAzimuth + 180));
        for (let i = 0, t = Period; i < AmountOfPoints; ++i, t += Period) {
            const Beta: number = (Math.abs(t * SelfData.RateOfTurn * ToRadian));
            if (Math.abs(SelfData.RateOfTurn) < 0.001) {
                Points[i] = { X: 0, Y: SelfData.GroundSpeed * t }
            }
            else {
                Points[i] = { X: Math.sign(rateOfTurn) * turnRadios * (1 - Math.cos(Beta)), Y: turnRadios * Math.sin(Beta) }
            }
            const r: number = Math.abs(SelfData.WindSpeed) * t;

            Points[i].X += (-r * Math.sin(Thetta))
            Points[i].Y += (r * Math.cos(Thetta))
        }
    }

    // function SetTurnFromSelfData(): void {
    //     RollAngle = SelfData.RollAngle;
    // }

    function GetRateOfTurn(): number {
        return (gravity * Math.tan(Math.abs(RollAngle) * ToRadian) * ToDegrees) / SelfData.GroundSpeed;
    }

    function GetTurnRadios(rateOfTurn: number): number {
        return (SelfData.GroundSpeed) / Math.abs(rateOfTurn * ToRadian)
    }

    function GetCartesianAzim(point: PointTypes): number {
        if (point.Y < 0)
            return ToDegrees * (Math.sign(point.X) * ((Math.PI / 2) + Math.atan(Math.abs(point.Y / point.X))))
        return ToDegrees * Math.atan(point.X / point.Y)
    }

    function GetCartesianDistance(point: PointTypes): number {
        return Math.sqrt(Math.pow(point.Y, 2) + Math.pow(point.X, 2))
    }

    function FindShortestPath(target: GeolibCoordinate, currData: SelfData): Position[] {
        SelfData = currData
        SelfPosition = { latitude: SelfData.Position.Latitude, longitude: SelfData.Position.Longitude }
        const AmountOfPoints: number = 30;
        Period = 150 / AmountOfPoints;
        let diffAzim: number = (360 + (getRhumbLineBearing(SelfPosition, target) - SelfData.TrueHeading)) % 360

        if (diffAzim > 0 && diffAzim < 180)
            RollAngle = 20;
        else
            RollAngle = -20;

        let turnRadios = GetTurnRadios(GetRateOfTurn());

        if (getDistance(SelfPosition, target) < 2 * turnRadios) {
            const GeoCoordinateArr: Position[] = [[SelfData.Position.Longitude, SelfData.Position.Latitude], [target.longitude, target.latitude]]
            return GeoCoordinateArr;
        }
        const tempNoodle: Position[] = CreateNoodle();
        let noodle: Position[] = [];
        debugger
        let isFound: boolean = false;
        for (let i = 0; i < AmountOfPoints - 1; i += 2) {
            noodle.push(tempNoodle[i]);
            noodle.push(tempNoodle[i + 1]);

            let lineAngle = getRhumbLineBearing(
                { latitude: tempNoodle[i][1], longitude: tempNoodle[i][0] },
                { latitude: tempNoodle[i + 1][1], longitude: tempNoodle[i + 1][0] }
            );
            let targetAngle = getRhumbLineBearing(
                { latitude: tempNoodle[i + 1][1], longitude: tempNoodle[i + 1][0] },
                target
            );
            let lineToTargetAngle = Math.abs(lineAngle - targetAngle);

            if (lineToTargetAngle < MaxAngleToDirect) {
                isFound = !isFound;
                break;
            }
        }
        if (isFound == false) {
            const Coordinates: Position[] = [[SelfData.Position.Longitude, SelfData.Position.Latitude], [target.longitude, target.latitude]]
            return Coordinates;
        }
        noodle.push([target.longitude, target.latitude]);
        return noodle
    }
    return { NoodleCalc, FindShortestPath };
}
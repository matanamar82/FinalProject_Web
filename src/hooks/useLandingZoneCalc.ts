import { Position } from "geojson";
import { computeDestinationPoint, getDistance, getGreatCircleBearing } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { useState } from "react";

export const useLandingZoneCalc = () => {
    const [CenterPoints, setCenterPoints] = useState<GeolibInputCoordinates[]>([])
    const [LeftWingPoints, setLeftWingPoints] = useState([])
    const [RightWingPoints, setRightWingPoints] = useState([])

    const getElevations = (Self_Coordinates:Position, Dest_Coordinates:Position):void => {
        setCenterPoints(getPointsInZone(Self_Coordinates, Dest_Coordinates))
    } // add the returning of elevations array, get the wingsPoints

    const getPointsInZone = (Self_Coordinates:Position, Dest_Coordinates:Position): GeolibInputCoordinates[] => {
        const distance = getDistance(
            {latitude: Self_Coordinates[1], longitude: Self_Coordinates[0]}, 
            {latitude: Dest_Coordinates[1], longitude: Dest_Coordinates[0]})
        // const Azimuth = (450 - ToDegrees * Math.atan((Dest_Coordinates[1] - Self_Coordinates[1]) / (Dest_Coordinates[0] - Self_Coordinates[0]))) % 360
        const Azimuth = getGreatCircleBearing(
            {latitude: Self_Coordinates[1], longitude: Self_Coordinates[0]}, 
            {latitude: Dest_Coordinates[1], longitude: Dest_Coordinates[0]})
        console.log(`P1: ${Self_Coordinates}\nP2: ${Dest_Coordinates}`)
        console.log(`the distnace between p1 to p2 is: ${distance / 1000} km`)
        console.log(`the azimuth is: ${Azimuth} degrees`)
        
        const distanceFromPoint = distance / 60 // 60 points
        const PointsInZone:GeolibInputCoordinates[] = [];
        PointsInZone[0] = {latitude: Self_Coordinates[1], longitude: Self_Coordinates[0]}
        PointsInZone[59] = {latitude: Dest_Coordinates[1], longitude: Dest_Coordinates[0]}

        for (let i = 1; i < 59; i++)
        {
            PointsInZone[i] = computeDestinationPoint(
                {latitude: Self_Coordinates[1], longitude: Self_Coordinates[0]}, 
                distanceFromPoint * i,
                Azimuth
            )
        }
        console.log(PointsInZone)

        return PointsInZone
    }
    

    return {getElevations}
}

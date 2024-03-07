import { Position } from "geojson";
import { computeDestinationPoint, getDistance, getRhumbLineBearing } from "geolib";
import { number } from "mathjs";

// wing length = 25m

export const useLandingZoneCalc = () => {
    
    const getElevations = async(selfCoordinates:Position, destCoordinates:Position) => {
        const longDistance = getDistance(
            {latitude: selfCoordinates[1], longitude: selfCoordinates[0]}, 
            {latitude: destCoordinates[1], longitude: destCoordinates[0]})

        const Azimuth = getRhumbLineBearing(
            {latitude: selfCoordinates[1], longitude: selfCoordinates[0]}, 
            {latitude: destCoordinates[1], longitude: destCoordinates[0]})
        
        console.log(`the azimuth is: ${Azimuth} degrees`)


        const distanceFromPoint = longDistance / 59 // 60 points
        console.log(`the distnace between p1 to p2 is: ${longDistance}`)

        // center 
        const CenterPoints:string[] = getPointsInZone(selfCoordinates, destCoordinates, distanceFromPoint, Azimuth)
        
        // right wing
        let { selfPoint: rightWingSelf, destPoint: rightWingDest } = getWingPoints(selfCoordinates, destCoordinates, Azimuth + 90);
        const RightWingPoints:string[] = getPointsInZone(rightWingSelf, rightWingDest, distanceFromPoint, Azimuth);

        // left wing
        let {selfPoint: leftWingSelf, destPoint: leftWingDest} = getWingPoints(selfCoordinates, destCoordinates, Azimuth - 90);
        const LeftWingPoints:string[] = getPointsInZone(leftWingSelf, leftWingDest, distanceFromPoint, Azimuth);
        
        const CenterElevation = await getElevationsArr(CenterPoints)
        
        const RightWingElevation = await getElevationsArr(RightWingPoints)

        const LeftWingElevation = await getElevationsArr(LeftWingPoints)

        const avgArr = getAvgArr(CenterElevation, LeftWingElevation, RightWingElevation)

        const distanceArr:number[] = getDistanceArr(distanceFromPoint)

        return {avgArr, distanceArr, longDistance};
        
    } 

    const getDistanceArr = (distanceFromPoint:number):number[] => {
        console.log(`the distnace between p1 to p2 is: ${distanceFromPoint}`)

        let distanceArr:number[] = []
        for(let i = 0; i<60; i++)
        {
            distanceArr[i] = number((distanceFromPoint * i).toFixed(3))
        }
        return distanceArr
    }
    const getWingPoints = (selfCoordinates:Position, destCoordinates:Position, Azimuth:number) => {
        let wingSelf = computeDestinationPoint(
            {latitude: selfCoordinates[1], longitude: selfCoordinates[0]},
            25,
            Azimuth
        ) 
        let wingDest = computeDestinationPoint(
            {latitude: destCoordinates[1], longitude: destCoordinates[0]},
            25,
            Azimuth
        )
        let selfPoint:Position = [wingSelf.longitude, wingSelf.latitude]
        let destPoint:Position = [wingDest.longitude, wingDest.latitude]

        return {selfPoint, destPoint}
    }
    const getPointsInZone = (selfCoordinates:Position, destCoordinates:Position, distanceFromPoint:number, Azimuth:number): string[] => {
        
        // const Azimuth = (450 - ToDegrees * Math.atan((Dest_Coordinates[1] - Self_Coordinates[1]) / (Dest_Coordinates[0] - Self_Coordinates[0]))) % 360
        console.log(`P1: ${selfCoordinates}\nP2: ${destCoordinates}`)
        console.log(`the azimuth is: ${Azimuth} degrees`)
        
        const PointsInZone:string[] = [];
        // *****************************************************************
        // selfCoordinates[0] === longitude 
        // selfCoordinates[1] === latitude
        // *****************************************************************

        PointsInZone[0] = `${selfCoordinates[1]},${selfCoordinates[0]}|`
        PointsInZone[59] = `${destCoordinates[1]},${destCoordinates[0]}|`
        for (let i = 1; i < 59; i++)
        {
            const Point = computeDestinationPoint(
                {latitude: selfCoordinates[1], longitude: selfCoordinates[0]}, 
                distanceFromPoint * i,
                Azimuth
            )
            PointsInZone[i] = `${Point.latitude},${Point.longitude}|`
        }
        return PointsInZone
    }
    
    const getElevationsArr = async (Points:string[]) => {
        let pointsToApiFormat = Points.join('');
        console.log("the arr is:")
        console.log(Points)
        try {
            const response = await fetch(`http://localhost:5000/api/${pointsToApiFormat}`);
            const data = await response.json();
            console.log(data)
        
            if (data.data && data.data.status === "OK") {
              return data.data.results;
            } else {
              console.log("Error");
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
    }

    const getAvgArr = (CenterElevation:any[], RightWingElevation:any[], LeftWingElevation:any[]) => {
        let avgArr:number[] = []
        for(let i = 0; i<60; i++)
            avgArr[i] = number(((CenterElevation[i].elevation + RightWingElevation[i].elevation + LeftWingElevation[i].elevation) / 3).toFixed(3))
        return avgArr 
    }

    return {getElevations}
}

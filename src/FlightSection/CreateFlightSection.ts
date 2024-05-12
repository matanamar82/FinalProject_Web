import { FlightSectionSegmentPoints } from "../types/FlightSectionTypes";

const ToDegrees = 180/Math.PI;
const FeetToMeter = 0.3048; 
// let SegmentPointsArr:FlightSectionSegmentPoints[];

export const CreateFlightSection = (SegmentsPointsArr:FlightSectionSegmentPoints[], SafeElevation:number) => 
{
    let FlightSectionArr:FlightSectionSegmentPoints[] = []

    for(let i = 0; i<SegmentsPointsArr.length; i++)
    {
        FlightSectionArr = CheckDegrees(SegmentsPointsArr, i, SafeElevation, [])
    }
    console.log(FlightSectionArr)
}

function CheckDegrees(SegmentsPointsArr: FlightSectionSegmentPoints[], i: number, SafeElevation: number, tempSection: FlightSectionSegmentPoints[]): FlightSectionSegmentPoints[] {
    let AngleBetweenPoints: number = getAngleBetweenPoints(SegmentsPointsArr[i]);

    if (AngleBetweenPoints < 0)
    {
        SegmentsPointsArr[i].maxElevationPoint.elevation = SegmentsPointsArr[i].segmentFirstPoint.elevation;
        SegmentsPointsArr[i].segmentLastPoint.elevation = SegmentsPointsArr[i].segmentFirstPoint.elevation;
        if(i < SegmentsPointsArr.length - 1)
            SegmentsPointsArr[i+1].segmentFirstPoint.elevation = SegmentsPointsArr[i].segmentFirstPoint.elevation;
        return SegmentsPointsArr;
    }
    else if (AngleBetweenPoints <= 10)
        return getMaxElevationPoints(SegmentsPointsArr, i);
    else if (AngleBetweenPoints > 45) {
        tempSection = getElevationForAngleRange(SegmentsPointsArr, i);
        if (i === 0)
            return tempSection;
        return CheckDegrees(tempSection, i - 1, SafeElevation, tempSection);
    }
    return SegmentsPointsArr;
}

function getAngleBetweenPoints(currentSegmentPoint: FlightSectionSegmentPoints):number
{
    let distanceBetweenPoints:number;
    let elevation:number;
    distanceBetweenPoints = currentSegmentPoint.maxElevationPoint.distanceFromStart - currentSegmentPoint.segmentFirstPoint.distanceFromStart;
    elevation = currentSegmentPoint.maxElevationPoint.elevation - currentSegmentPoint.segmentFirstPoint.elevation;
    if(elevation < 0) // נקודת ההתחלה גבוהה מנקודת המקסימום
        return elevation;
    return (360 + Math.atan(elevation / distanceBetweenPoints) * ToDegrees) % 360;
}

function getMaxElevationPoints(SegmentsPointsArr:FlightSectionSegmentPoints[], i:number):FlightSectionSegmentPoints[]{
    SegmentsPointsArr[i].segmentFirstPoint.elevation = SegmentsPointsArr[i].maxElevationPoint.elevation;
    SegmentsPointsArr[i].segmentLastPoint.elevation = SegmentsPointsArr[i].maxElevationPoint.elevation;
    if(i > 0)
        SegmentsPointsArr[i-1].segmentLastPoint.elevation = SegmentsPointsArr[i].maxElevationPoint.elevation;
    if(i<SegmentsPointsArr.length-1)
        SegmentsPointsArr[i+1].segmentFirstPoint.elevation = SegmentsPointsArr[i].maxElevationPoint.elevation;
    return SegmentsPointsArr
}

function getElevationForAngleRange(SegmentsPointsArr: FlightSectionSegmentPoints[], i: number): FlightSectionSegmentPoints[] {
    while (getAngleBetweenPoints(SegmentsPointsArr[i]) > 45) {
        SegmentsPointsArr[i].segmentFirstPoint.elevation += 5; // Increase elevation by 5 meters
        if (i > 0)
            SegmentsPointsArr[i - 1].segmentLastPoint.elevation += 5;
    }
    return SegmentsPointsArr;
}
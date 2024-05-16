import { FlightSectionSegmentPoints } from "../types/FlightSectionTypes";

const ToDegrees = 180/Math.PI;
const FeetToMeter = 0.3048; 
// let SegmentPointsArr:FlightSectionSegmentPoints[];

export const CreateFlightSection = (SegmentsPointsArr:FlightSectionSegmentPoints[], SafeElevation:number) => 
{
    let FlightSectionArr:FlightSectionSegmentPoints[] = []
    let SectionElevationsArr = [];
    // console.log(SegmentsPointsArr.length)
    for(let i = 0; i<SegmentsPointsArr.length; i++)
    {
        FlightSectionArr = CheckDegrees(SegmentsPointsArr, i, [])
    }
    
    let startIndex;
    let endIndex;
    for(let i = 0; i<FlightSectionArr.length; i++)
    {
        startIndex = FlightSectionArr[i].segmentFirstPoint.indexInLegArray;
        endIndex = FlightSectionArr[i].maxElevationPoint.indexInLegArray;
        // SectionElevationsArr.push(FlightSectionArr[i].segmentFirstPoint.elevation)
        SectionElevationsArr.push(FlightSectionArr[i].segmentFirstPoint.elevation + SafeElevation)
        for(let j = startIndex + 1; j < endIndex; j++)
            SectionElevationsArr.push(null);
        if(startIndex !== endIndex)
            SectionElevationsArr.push(FlightSectionArr[i].maxElevationPoint.elevation + SafeElevation)
        // if(startIndex !== endIndex)
        //     SectionElevationsArr.push(FlightSectionArr[i].maxElevationPoint.elevation)
        startIndex = SectionElevationsArr.length;
        endIndex = FlightSectionArr[i].segmentLastPoint.indexInLegArray;
        
        for(let j = startIndex; j < endIndex; j++)
            SectionElevationsArr.push(null);
    }

    while(SectionElevationsArr.length < 60)
        SectionElevationsArr.push(FlightSectionArr[FlightSectionArr.length - 1].segmentLastPoint.elevation)
    while(SectionElevationsArr.length > 60)
        SectionElevationsArr.pop()
    
    // console.log(SectionElevationsArr)
    return SectionElevationsArr;
}

function CheckDegrees(SegmentsPointsArr: FlightSectionSegmentPoints[], i: number, tempSection: FlightSectionSegmentPoints[]): FlightSectionSegmentPoints[] {
    let AngleBetweenPoints: number = getAngleBetweenPoints(SegmentsPointsArr[i]);

    if (AngleBetweenPoints < 0)
    {
        SegmentsPointsArr[i].segmentLastPoint.elevation = SegmentsPointsArr[i].maxElevationPoint.elevation;
        if(i < SegmentsPointsArr.length - 1)
            SegmentsPointsArr[i+1].segmentFirstPoint.elevation = SegmentsPointsArr[i].maxElevationPoint.elevation;
        return SegmentsPointsArr;
    }
    if (AngleBetweenPoints >= 0 && AngleBetweenPoints <= 10)
        return getMaxElevationPoints(SegmentsPointsArr, i);
    else if (AngleBetweenPoints > 45) {
        tempSection = getElevationForAngleRange(SegmentsPointsArr, i);
        if (i === 0)
            return tempSection;
        return CheckDegrees(tempSection, i - 1, tempSection);
    }
    return SegmentsPointsArr;
}

function getAngleBetweenPoints(currentSegmentPoint: FlightSectionSegmentPoints):number
{
    let distanceBetweenPoints:number;
    let elevation:number;
    distanceBetweenPoints = currentSegmentPoint.maxElevationPoint.distanceFromStart - currentSegmentPoint.segmentFirstPoint.distanceFromStart;
    elevation = currentSegmentPoint.maxElevationPoint.elevation - currentSegmentPoint.segmentFirstPoint.elevation;

    return Math.atan(elevation / distanceBetweenPoints) * ToDegrees;
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

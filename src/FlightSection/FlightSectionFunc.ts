import { Position } from "geojson";
import { Noodle } from "../Component/Noodle";
import { getDistance, getRhumbLineBearing } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { FlightLegProps } from "../types/DialogTypes";
import { distance, i } from "mathjs";

type FlightSectionPoint = {
    distanceFromStart: number,
    elevation: number
}

type FlightSectionSegmentPoints = {
    segmentFirstPoint: FlightSectionPoint,
    maxElevationPoint: FlightSectionPoint
}

const ToDegrees = 180/Math.PI;
const FeetToMeter = 0.3048; 
const AlertTime = 15; 
const ParamsPerSegment:number = Math.round(AlertTime/2)

export const FlightSectionFunc = (LegPointsArr:FlightSectionSegmentPoints[],FlightSectionArr:FlightSectionSegmentPoints[], segmentNumber:number, index:number, CheckedSegmentsNumber:number): FlightSectionSegmentPoints[] => 
{
    const AngleBetweenPoints:number = getAngleBetweenPoints(LegPointsArr[index]);
    if(AngleBetweenPoints < 10) // כאשר הזווית בין 2 הנקודות קטנה מעשר, אזי ניתן לטפס לגובה של הנקודה המקסימלית ולהתיישר בה
        FlightSectionArr[index] = getMaxElevationPoints(LegPointsArr[index])
    else if(AngleBetweenPoints >= 10 && AngleBetweenPoints <= 45) // כאשר הזווית בין 2 הנקודות בטווח הנתון, המטוס יבצע טיפוס מנדטורי
    {

    }
    else // כאשר הזווית גדולה מ-45 יש לבצע חישוב שיחזיר לנו את הגובה המינימלי שעל המטוס להיות על מנת לקבל זווית שבטווח.
    {

    }
    // shift tangens = Math.atan() => return in radians => degrees: Math.atan() * (180 / Math.PI)
    // ביצוע החישובים להצגת חתך הטיסה לאותו המקטע
    
    if(segmentNumber === 0) // אם זה המקטע הראשון 
        return FlightSectionArr;
    if(CheckedSegmentsNumber === 0)
        return FlightSectionFunc(LegPointsArr, FlightSectionArr, segmentNumber++, index++, CheckedSegmentsNumber++)
    return FlightSectionFunc(LegPointsArr, FlightSectionArr, segmentNumber++, index++,  CheckedSegmentsNumber++) // לתקן
}

function getAngleBetweenPoints(SegmentPoints:FlightSectionSegmentPoints):number{
    const distanceBetweenPoints:number = SegmentPoints.maxElevationPoint.distanceFromStart - SegmentPoints.segmentFirstPoint.distanceFromStart;
    const elevation:number = SegmentPoints.maxElevationPoint.elevation - SegmentPoints.segmentFirstPoint.elevation;
    return (360 + Math.atan(elevation / distanceBetweenPoints) * ToDegrees) % 360;

}

function getMaxElevationPoints(SegmentPoints:FlightSectionSegmentPoints):FlightSectionSegmentPoints{
    return {
        segmentFirstPoint: {
            distanceFromStart: SegmentPoints.segmentFirstPoint.distanceFromStart,
            elevation: SegmentPoints.maxElevationPoint.elevation
        },
        maxElevationPoint: SegmentPoints.maxElevationPoint
    };
}

function getElevationForAngleRange(SegmentPoints:FlightSectionSegmentPoints)
{
    while(getAngleBetweenPoints(SegmentPoints) > 45)
    {
        SegmentPoints.segmentFirstPoint.elevation += 5 // נגביה את הנקודה ב-5 מטרים כל פעם 
    }
}

export function CreateSegmentsPointsArr(LegProperties:FlightLegProps):FlightSectionSegmentPoints[]
{
    const {calculatedNoodle, LengthOfNoodle} = getNoodleWithLegLength(LegProperties)

    const {distancesOfNoodleArr} = getSegmentsAndDistanceArrayFromNoodle(calculatedNoodle, LengthOfNoodle)

    let NoodleElevations:FlightSectionPoint[][] = []
    let indexInLeg:number = 0;
    for(let k = 0; k < distancesOfNoodleArr.length; k++)
    {
        NoodleElevations[k] = [];

        for(let j = 0; j < distancesOfNoodleArr[k].length; j++)
        {
            const {FlightSectionPoint, i} = GetNoodlePointElevation(distancesOfNoodleArr[k][j], LegProperties, indexInLeg);
            indexInLeg = i;
            NoodleElevations[k][j] = FlightSectionPoint;
        }
    }

    let FlightSectionPoints:FlightSectionSegmentPoints[] = []
    for(let k = 0; k < NoodleElevations.length; k++)
    {
        FlightSectionPoints[k] = {segmentFirstPoint: NoodleElevations[k][0], maxElevationPoint: MaxElevationPointInSegment(NoodleElevations[k])}
    }

    return FlightSectionPoints;
}

function MaxElevationPointInSegment(FlightSectionPointArr:FlightSectionPoint[]):FlightSectionPoint{
    const Elevations = FlightSectionPointArr.map(point => point.elevation)
    const maxElevation = Math.max(...Elevations)
    const maxElevationPoint = FlightSectionPointArr.find(Point => Point.elevation === maxElevation)
    if(maxElevationPoint)
        return maxElevationPoint
    alert("ישנה בעיה בחישוב חתך הטיסה, נסה שנית מאוחר יותר")
    return {distanceFromStart: FlightSectionPointArr[0].distanceFromStart, elevation: FlightSectionPointArr[0].elevation}
}

function GetNoodlePointElevation(distanceFromStart:number, LegProperties:FlightLegProps, indexInLeg:number){
    let FlightSectionPoint:FlightSectionPoint;
    for(let i = indexInLeg; i < LegProperties.distancesArr.length; i++)
    {
        if(LegProperties.distancesArr[i] === distanceFromStart)
        {
            FlightSectionPoint = {distanceFromStart: distanceFromStart, elevation: LegProperties.elevationsArr[i]}
            return {FlightSectionPoint, i};
        }
        else if(LegProperties.distancesArr[i] > distanceFromStart)
        {
            if(i !== 0)
                {
                    FlightSectionPoint = {distanceFromStart: distanceFromStart, elevation: LegProperties.elevationsArr[i-1]}
                    return {FlightSectionPoint, i};
                }
                FlightSectionPoint = {distanceFromStart: distanceFromStart, elevation: LegProperties.elevationsArr[i]};
                return {FlightSectionPoint, i};
        }
    }
    FlightSectionPoint = {distanceFromStart: distanceFromStart, elevation: LegProperties.elevationsArr[LegProperties.distancesArr.length - 1]}
    let i = LegProperties.distancesArr.length
    return {FlightSectionPoint, i}
}

function getNoodleWithLegLength(LegProperties:FlightLegProps)
{
    const LegStartCoordinates:GeolibInputCoordinates = {latitude: LegProperties.selfCoordinates[1], longitude: LegProperties.selfCoordinates[0]};
    const LegEndCoordinates:GeolibInputCoordinates = {latitude: LegProperties.destCoordinates[1], longitude: LegProperties.destCoordinates[0]}
    const LegLength:number = LegProperties.distance;
    const TrueHeading:number = getRhumbLineBearing(
        LegStartCoordinates,
        LegEndCoordinates
    )
    let LengthOfNoodle = 0;
    const {NoodleCalc} = Noodle();

    let calculatedNoodle = NoodleCalc(undefined, LegProperties.selfCoordinates, TrueHeading);

    LengthOfNoodle = getDistance(
        LegStartCoordinates, 
        {latitude: calculatedNoodle[calculatedNoodle.length - 1][1], longitude: calculatedNoodle[calculatedNoodle.length - 1][0]}
    )

    while(LengthOfNoodle < LegLength)
    {
        calculatedNoodle = NoodleCalc(undefined, calculatedNoodle[calculatedNoodle.length - 1], TrueHeading)
        calculatedNoodle.shift()
        LengthOfNoodle = getDistance(
            LegStartCoordinates, 
            {latitude: calculatedNoodle[calculatedNoodle.length - 1][1], longitude: calculatedNoodle[calculatedNoodle.length - 1][0]}
        )
    }

    let poppedPoint:Position | undefined = [];

    while(LengthOfNoodle >= LegLength)
    {
        poppedPoint = calculatedNoodle.pop();
        LengthOfNoodle = getDistance(
            LegStartCoordinates, 
            {latitude: calculatedNoodle[calculatedNoodle.length - 1][1], longitude: calculatedNoodle[calculatedNoodle.length - 1][0]}
        )
    }

    if(poppedPoint){
        calculatedNoodle.push(poppedPoint);
        LengthOfNoodle = getDistance(
            LegStartCoordinates, 
            {latitude: calculatedNoodle[calculatedNoodle.length - 1][1], longitude: calculatedNoodle[calculatedNoodle.length - 1][0]}
        )
    } 

    return {calculatedNoodle, LengthOfNoodle}
}

function getSegmentsAndDistanceArrayFromNoodle(calculatedNoodle:Position[], LengthOfNoodle:number)
{
    const numberOfSegments:number = (calculatedNoodle.length - 1)*2 / 15;;
    const distanceBetweenPointsInNoodle:number = LengthOfNoodle / (calculatedNoodle.length - 1)

    let distancesOfNoodleArr:number[][] = [];
    let SegmentsOfNoodle:Position[][] = [] // מערך שכל איבר בו מכיל מערך של positions

    for(let i = 0; i<numberOfSegments - 1; i++) // יחלק את הנודל לסגמנטים
    {
        distancesOfNoodleArr[i] = [];
        SegmentsOfNoodle[i] = [];
        for(let j = i*ParamsPerSegment; j < (i+1)*ParamsPerSegment; j++) 
        {
            SegmentsOfNoodle[i].push(calculatedNoodle[j])
            distancesOfNoodleArr[i].push(distanceBetweenPointsInNoodle*j)
        }    
    }

    if(SegmentsOfNoodle.length*ParamsPerSegment < calculatedNoodle.length)
    {
        distancesOfNoodleArr[SegmentsOfNoodle.length] = [];
        SegmentsOfNoodle[SegmentsOfNoodle.length] = [];
    
        for(let i = ParamsPerSegment*(SegmentsOfNoodle.length - 1); i<calculatedNoodle.length; i++)
        {
            SegmentsOfNoodle[SegmentsOfNoodle.length - 1].push(calculatedNoodle[i]);
            distancesOfNoodleArr[SegmentsOfNoodle.length - 1].push(distanceBetweenPointsInNoodle*i)
        } 
    }

    // return {SegmentsOfNoodle, distancesOfNoodleArr}
    return {distancesOfNoodleArr}

}

function DivideLegForSegments(){

}

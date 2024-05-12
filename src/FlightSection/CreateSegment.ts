import { Position } from "geojson";
import { Noodle } from "../Component/Noodle";
import { getDistance, getRhumbLineBearing } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { FlightLegProps } from "../types/DialogTypes";
import { FlightSectionPoint, FlightSectionSegmentPoints } from "../types/FlightSectionTypes";

const AlertTime = 15; 
const ParamsPerSegment:number = Math.round(AlertTime/2)

export function CreateSegmentsPointsArr(LegProperties:FlightLegProps)
{
    const {calculatedNoodle, LengthOfNoodle} = getNoodleWithLegLength(LegProperties)

    const {distancesOfNoodleArr} = getDistanceArrayFromNoodle(calculatedNoodle, LengthOfNoodle)
    
    let NoodleElevations:FlightSectionPoint[][] = []
    let indexInLeg:number = 0;

    const distanceBetweenPoints = LengthOfNoodle / calculatedNoodle.length

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
    // console.log("start max:")
    for(let k = 0; k < NoodleElevations.length; k++)
    {
        FlightSectionPoints[k] = {
            segmentFirstPoint: NoodleElevations[k][0], 
            segmentLastPoint: NoodleElevations[k][NoodleElevations[k].length-1],
            maxElevationPoint: MaxElevationPointInSegment(NoodleElevations[k])
        }
        if(FlightSectionPoints[k].maxElevationPoint.elevation == -1)
            break;
    }

    return FlightSectionPoints;
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

function getDistanceArrayFromNoodle(calculatedNoodle:Position[], LengthOfNoodle:number)
{
    const numberOfSegments:number = (calculatedNoodle.length - 1)*2 / AlertTime;;
    const distanceBetweenPointsInNoodle:number = LengthOfNoodle / (calculatedNoodle.length - 1)

    let distancesOfNoodleArr:number[][] = [];
    let SegmentsOfNoodle:Position[][] = [] // מערך שכל איבר בו מכיל מערך של positions
    let IndexOfNoodle = 0;
    
    for(let i = 0; i<numberOfSegments; i++) // יחלק את הנודל לסגמנטים
    {
        distancesOfNoodleArr[i] = [];
        SegmentsOfNoodle[i] = [];
        let EndIndex;
        if(calculatedNoodle.length >= ParamsPerSegment)
            EndIndex = (IndexOfNoodle + ParamsPerSegment)
        else
            EndIndex = calculatedNoodle.length;

        for(let j = IndexOfNoodle; j < EndIndex; j++) 
        {
            SegmentsOfNoodle[i].push(calculatedNoodle[j])
            distancesOfNoodleArr[i].push(distanceBetweenPointsInNoodle*j)
            IndexOfNoodle++;
        }
        IndexOfNoodle--;
    }

    if(distancesOfNoodleArr[SegmentsOfNoodle.length - 1][ParamsPerSegment - 1] < LengthOfNoodle)
    {
        distancesOfNoodleArr[SegmentsOfNoodle.length] = [];
        SegmentsOfNoodle[SegmentsOfNoodle.length] = [];
        const continueSegmentIndex = SegmentsOfNoodle.length - 1
        const ContinueIndex = ParamsPerSegment*continueSegmentIndex - continueSegmentIndex

        for(let i = ContinueIndex; i<calculatedNoodle.length; i++)
        {
            SegmentsOfNoodle[SegmentsOfNoodle.length - 1].push(calculatedNoodle[i]);
            distancesOfNoodleArr[SegmentsOfNoodle.length - 1].push(distanceBetweenPointsInNoodle*i)
        } 
    }

    return {distancesOfNoodleArr}
}


function GetNoodlePointElevation(distanceFromStart:number, LegProperties:FlightLegProps, indexInLeg:number){
    let FlightSectionPoint:FlightSectionPoint;
    for(let i = indexInLeg; i < LegProperties.distancesArr.length; i++)
    {
        if(distanceFromStart <= LegProperties.distancesArr[i])
        {
            if(i !== 0)
            {
                const CheckCurrentPoint = distanceFromStart / LegProperties.distancesArr[i]
                const CheckPreviousPoint =  LegProperties.distancesArr[i-1] / distanceFromStart
                // LegProperties.elevationsArr[i-1] == LegProperties.maxElevation
                if(LegProperties.elevationsArr[i] == Number(LegProperties.maxElevation))
                    FlightSectionPoint = {
                distanceFromStart: distanceFromStart, 
                elevation: LegProperties.elevationsArr[i], 
                indexInLegArray: i}
                else if (LegProperties.elevationsArr[i-1] == Number(LegProperties.maxElevation))
                {
                    FlightSectionPoint = {
                        distanceFromStart: distanceFromStart, 
                        elevation: LegProperties.elevationsArr[i-1],
                        indexInLegArray: i-1
                    }
                    i = i - 1
                }
                else if((CheckCurrentPoint < CheckPreviousPoint) && (LegProperties.elevationsArr[i] !== Number(LegProperties.maxElevation))) // הנקודה קרובה יותר לנקודה הנוכחית 
                {
                    
                    FlightSectionPoint = {
                        distanceFromStart: distanceFromStart, 
                        elevation: LegProperties.elevationsArr[i-1],
                        indexInLegArray: i-1
                    }
                    i = i - 1
                }
                else
                    FlightSectionPoint = {
                distanceFromStart: distanceFromStart, 
                elevation: LegProperties.elevationsArr[i],
                indexInLegArray: i
            }
            }
            else
                FlightSectionPoint = {
            distanceFromStart: distanceFromStart, 
            elevation: LegProperties.elevationsArr[i],
            indexInLegArray: i
        };
            return {FlightSectionPoint, i};
        }
    }
    FlightSectionPoint = {
        distanceFromStart: distanceFromStart, 
        elevation: LegProperties.elevationsArr[LegProperties.distancesArr.length - 1],
        indexInLegArray: LegProperties.distancesArr.length - 1
    }
    let i = LegProperties.distancesArr.length
    return {FlightSectionPoint, i}
}


function MaxElevationPointInSegment(FlightSectionPointArr:FlightSectionPoint[]):FlightSectionPoint{
    const Elevations = FlightSectionPointArr.map(point => point.elevation)
    Elevations.shift();
    // console.log(Elevations)
    const maxElevation = Math.max(...Elevations)
    // console.log(`the max is: ${maxElevation}`)
    const maxElevationPoint = FlightSectionPointArr.find(Point => Point.elevation === maxElevation)
    if(maxElevationPoint)
        return maxElevationPoint
    alert("ישנה בעיה בחישוב חתך הטיסה, נסה שנית מאוחר יותר")
    return {distanceFromStart: -1, elevation: -1, indexInLegArray: -1}
}








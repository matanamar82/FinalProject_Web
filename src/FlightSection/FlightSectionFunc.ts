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
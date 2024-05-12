export type FlightSectionPoint = {
    distanceFromStart: number,
    elevation: number,
    indexInLegArray: number
}

export type FlightSectionSegmentPoints = {
    segmentFirstPoint: FlightSectionPoint,
    segmentLastPoint: FlightSectionPoint,
    maxElevationPoint: FlightSectionPoint
}
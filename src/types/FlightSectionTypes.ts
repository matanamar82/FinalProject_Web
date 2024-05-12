export type FlightSectionPoint = {
    distanceFromStart: number,
    elevation: number
}

export type FlightSectionSegmentPoints = {
    segmentFirstPoint: FlightSectionPoint,
    segmentLastPoint: FlightSectionPoint,
    maxElevationPoint: FlightSectionPoint
}
type FlightSectionPoint = {
    distanceFromStart: number,
    elevation: number
}

export type FlightSectionSegmentPoints = {
    segmentFirstPoint: FlightSectionPoint,
    maxElevationPoint: FlightSectionPoint
}
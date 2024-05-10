export interface GeoCoordinate {
    Latitude: number,
    Longitude: number
}
export type SelfData = {
    Position:GeoCoordinate
    CallSign:String
    TrueAirSpeed:number
    RateOfTurn:number
    RollAngle:number
    AltitudeRate:number
    WindSpeed:number
    WindAzimuth:number
    TrueTrack:number
    TrueHeading:number
    Altitude:number
    PitchAngle:number
    GroundSpeed:number
}

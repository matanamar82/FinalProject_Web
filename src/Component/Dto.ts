import { GeolibInputCoordinates } from 'geolib/es/types';
// add selfData properties
export class SelfData
{
    public Position:GeolibInputCoordinates = {longitude: 0, latitude: 0}
    public CallSign:String = "Samson";
    public TrueAirSpeed:number = 100;
    public RateOfTurn:number = 0
    public RollAngle:number = 30
    public AltitudeRate:number = 0;
    public WindSpeed:number = 5;
    public WindAzimuth:number = 90;
    public TrueTrack:number = 360;
    public TrueHeading:number = 0;
    public Altitude:number = 0;
    public PitchAngle:number = 0;
    public GroundSpeed:number = 100;
}

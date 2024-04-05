
export const PinModeOptions : Record<string, Function>  = {
    FlightLeg : FlightLegPinMode ,
    wptPinMode : ()=>{}, 
    wptLandingLocation :()=>{}
}

function FlightLegPinMode()
{
    //pin 2 locations
}

function WptPinMode()
{
    //pin only one location
}

function wptLandingLocationPinMode()
{
    //pin only one location, but show other things
}

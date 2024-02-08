
export const PinModeOptions : Record<string, Function>  = {
    LandingZone : landingPinMode ,
    wptPinMode : ()=>{}, 
    wptLandingLocation :()=>{}
}

function landingPinMode()
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

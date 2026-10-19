import {
    Wifi ,
    Tv,
    Snowflake,
    Microwave, 
    WashingMachine,
    Car,
    WavesHorizontal ,
    Bath,
    Dumbbell  

} from 'lucide-react';

const AMMENITIES_ICONS = {
    wifi: Wifi,
    tv: Tv,
    'air conditioning': Snowflake,
    kitchen: Microwave,
    washer: WashingMachine,
    dryer: WashingMachine,
    'free parking': Car,
    pool: WavesHorizontal,
    'hot tub': Bath,
    gym: Dumbbell
}
export const getAmmenitiesIcon = (name) => {
    return AMMENITIES_ICONS[name?.toLowerCase()] ?? null;
}

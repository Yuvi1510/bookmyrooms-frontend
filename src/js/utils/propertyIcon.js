import { 
    BuildingComplex,
    House,
    Hotel,
    Houses,
    Castle
} from 'lucide-react';


export const PROPERTY_ICONS = {
    home: House,
    apartment: BuildingComplex,
    villa: Castle,
    guesthouse: Houses,
    hotel: Hotel,
}


// return the iscon component based on the name
// if match is not found, return the default icon (BuildingComplex)
// The ?? operator is called the nullish coalescing operator.
// It returns the value on the left unless that value is null or undefined. Otherwise, it returns the value on the right.
export const getPropertyIcon = (name) => {
    return PROPERTY_ICONS[name?.toLowerCase()] ?? BuildingComplex;
};


// For admin dropdowns — returns list of { value, label }
export const PROPERTY_ICON_OPTIONS = Object.entries(PROPERTY_ICONS).map(
    ([key]) => ({
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
    })
);

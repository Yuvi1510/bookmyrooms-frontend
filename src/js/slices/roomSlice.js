import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    newRoom: {
        roomNumber: "",
        areaInSqFt: "",
        roomType: "BASIC", // Default selection
        capacity: {
            guests: 1,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1
        },
        pricing: {
            basePrice: 1000,
            weekendAdjustment: 2,
            cleaningFee: 300,
        },
        amenities: []
    },
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setBasicInfo: (state, action) => {
            state.newRoom.roomNumber = action.payload.roomNumber;
            state.newRoom.areaInSqFt = action.payload.areaInSqFt;
            state.newRoom.roomType = action.payload.roomType;
        },
        setCapacity: (state, action) => {
            state.newRoom.capacity = action.payload;
        },
        setPricing: (state, action) => {
            state.newRoom.pricing = action.payload;
        },
        setAmenities: (state, action) => {
            state.newRoom.amenities = action.payload;
        }
    }
});

export const {setBasicInfo, setCapacity, setPricing, setAmenities} = roomSlice.actions;
export default roomSlice.reducer;
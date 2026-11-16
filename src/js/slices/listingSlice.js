import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newListing: {
    address: {
      country: "Nepal",
      street: "",
      city: "",
      province: "",
      postalCode: "",
    },
    propertyStructure: "",
    privacyType: "",
    location: {
      latitude: null,
      longitude: null
    },
    title: "",
    description: "",
  },

}


const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.newListing.address = action.payload;
    },
    updatePropertyStructure: (state, action) => {
      state.newListing.propertyStructure = action.payload;
    },
    updatePrivacyType: (state, action) => {
      state.newListing.privacyType = action.payload;
    },
    updateLocation: (state, action) => {
      state.newListing.location = action.payload;
    },
    updateCapacity: (state, action) => {
      state.newListing.capacity = action.payload;
    },
    updateAmenities: (state, action) => {
      state.newListing.amenities = action.payload;
    },
    updateTitle: (state, action) => {
      state.newListing.title = action.payload;
    },
    updateDescription: (state, action) => {
      state.newListing.description = action.payload;
    },
    updatePrice: (state, action) => {
      state.newListing.price = action.payload;
    },
  }
});

export const { updateAddress, updatePropertyStructure, updatePrivacyType, updateLocation, updateCapacity, updateAmenities, updateTitle, updateDescription, updatePrice } = listingSlice.actions;
export default listingSlice.reducer;
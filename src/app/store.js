import {configureStore} from '@reduxjs/toolkit';
import listingReducer from '../js/slices/listingSlice';
import roomReducer from '../js/slices/roomSlice';

const store = configureStore({
  reducer: {
    listing: listingReducer,
    room: roomReducer,
  },
});

export default store;
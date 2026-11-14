import {configureStore} from '@reduxjs/toolkit';
import listingReducer from '../js/slices/listingSlice';

const store = configureStore({
  reducer: {
    listing: listingReducer,
  },
});

export default store;
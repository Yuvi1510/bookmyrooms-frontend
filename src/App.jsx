import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import Host from './layouts/Host'
import HostListings from './components/host/HostListings'
import AddListings from './layouts/AddListings'
import Address from './components/host/listingSteps/Address'
import PropertyLists from './components/host/properties/PropertyLists';
import AboutProperty from './components/host/listingSteps/AboutProperty';
import PropertyStructure from './components/host/listingSteps/PropertyStructure';
import { ToastContainer } from 'react-toastify';
import PrivacyType from './components/host/listingSteps/PrivacyType';
import Location from './components/host/listingSteps/Location';
import StandOut from './components/host/listingSteps/StandOut';
import PropertyPhotos from './components/host/listingSteps/PropertyPhotos';
import Title from './components/host/listingSteps/Title';
import Description from './components/host/listingSteps/Description';
import {Provider} from 'react-redux';
import store from "./app/store";
import PropertyDetails from './components/host/properties/PropertyDetails';

function App() {

  return (
    <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
            <Routes>
                <Route path="/host" element={<Host/>}>
                    <Route index element={<PropertyLists />} />
                    <Route path="listings" element={<HostListings />} >
                        <Route index element={<PropertyLists/>}/>
                        <Route path="new" element={<AddListings />} >
                            <Route index element={<Address />} />
                            <Route path="about-property" element={<AboutProperty/>} />
                            <Route path="structure" element={<PropertyStructure/>} />
                            <Route path="privacy-type" element={<PrivacyType/>} />
                            <Route path="location" element={<Location/>} />
                            {/* <Route path="floor-plan" element={<FloorPlan/>} /> */}
                            <Route path="stand-out" element={<StandOut/>} />
                            {/* <Route path="ammenities" element={<Ammenities/>} /> */}
                            <Route path="photos" element={<PropertyPhotos/>} />
                            <Route path='title' element={<Title/>}/>
                            <Route path='description' element={<Description/>}/>
                            {/* <Route path='pricing' element={<Pricing/>}/> */}
                        </Route>
                        <Route path=":propertyId" element={<PropertyDetails/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
    
  )
}

export default App

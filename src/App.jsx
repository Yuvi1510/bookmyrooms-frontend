import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import Host from './layouts/Host'
import HostListings from './components/host/HostListings'

function App() {

  return (
    <BrowserRouter>
            <Routes>
                <Route path="/host" element={<Host/>}>
                    <Route index element={<HostListings />} />
                    {/* <Route path="today" element={<HostToday />} />
                    <Route path="calendar" element={<HostCalendar />} />
                    <Route path="listings" element={<HostListings />} />
                    <Route path="messages" element={<HostMessages />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    
  )
}

export default App

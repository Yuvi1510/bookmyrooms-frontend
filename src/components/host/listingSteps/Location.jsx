import {useState, useCallback, useRef} from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router";
import { Crosshair, MapPin } from 'lucide-react';
import { toast } from "react-toastify";

 const DEFAULT_CENTER = [28.2096, 83.9856]; // Pokhara coordinates [lat, lng]
 const DEFAULT_ZOOM = 12;

// child component to handle map events and update marker position
 const LocationMarker = ({position, onLocationChange}) => {
    useMapEvents({
        click(e) {
            onLocationChange(e.latlng.lat, e.latlng.lng);
        }
    });

    return position ? (
        <Marker position={position} draggable={true} eventHandlers={{
            dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                onLocationChange(lat, lng);
            },
        }} />
    ):null;
 };

// main component
const Location = () => {

const navigate = useNavigate();
const [position, setPosition] = useState(DEFAULT_CENTER);
const [locating, setLocating] = useState(false);
const [coords, setCoords] = useState(null);
const mapRef = useRef(null);

const handleLocationChange = ((lat,lng) => {
    setPosition([lat, lng]);
    setCoords({lat, lng});
});

const handleNext = () => {
        // Navigate to the next step in the listing process
        if(!coords){
            toast.error("Please select a loaction first",{
        position: "top-right",
        autoClose: 3000,
      })
      return;
        }

        navigate("/host/listings/new/floor-plan");
    }

     const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                handleLocationChange(latitude, longitude);
                mapRef.current?.flyTo([latitude, longitude], 16);
                setLocating(false);
            },
            (err) => {
                toast.error('Could not get your location: ' + err.message);
                setLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

  return (
    <div className="min-h-screen  bg-white">
      <div className="container mx-auto ">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-2xl font-bold ">
          Is the pin in the right location?
        </h1>
        <p className="">
          If not, please drag the pin to the correct location.
        </p>
        <button
                    type="button"
                    onClick={handleUseMyLocation}
                    disabled={locating}
                    className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border border-(--line) hover:bg-(--subtle-bg) disabled:opacity-50"
                >
                    <Crosshair className="w-4 h-4" />
                    {locating ? 'Locating...' : 'Use my location'}
                </button>
        <p className="">
          {/* {coords && `Coordinates: ${coords.lat}, ${coords.lng}`} */}
          {position && `Coordinates: ${position[0]}, ${position[1]}`}
        </p>
        </div>
        <div className="mx-auto mt-3 w-lg flex justify-center rounded-2xl overflow-hidden border border-(--dark-pink)">
          <MapContainer
            ref={mapRef}
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             <LocationMarker
                    position={position}
                    onLocationChange={handleLocationChange}
                />
          </MapContainer>
        </div>
        <div className="flex justify-center mt-4">
            <button onClick={handleNext} className="bg-(--dark-pink) mx-auto text-white px-4 py-2 rounded mt-4"> Next</button>
        </div>
      </div>
    </div>
  );
};

export default Location;

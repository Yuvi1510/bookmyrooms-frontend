import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from 'react-redux';
import { setCapacity } from "../../../js/slices/roomSlice";

const FloorPlan = () => {
    const dispatch = useDispatch();
    const { propertyId } = useParams(); 
    const capacityFromStore = useSelector((state) => state.room.newRoom.capacity);

    const [guests, setGuests] = useState(capacityFromStore.guests || 1);
    const [bedrooms, setBedrooms] = useState(capacityFromStore.bedrooms || 1);
    const [beds, setBeds] = useState(capacityFromStore.beds || 1);
    const [bathrooms, setBathrooms] = useState(capacityFromStore.bathrooms || 1);

    const navigate = useNavigate();

    const handleNext = (id) => {
        dispatch(setCapacity({guests, bedrooms, beds, bathrooms}));
        navigate(`/host/listings/${id}/rooms/new/pricing`);
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 mt-5 ">
      
      <div className="p-6 md:p-8 bg-(--light-yellow) rounded-xl shadow-md w-full max-w-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--ink)">Tell us about your place</h1>
          <p className="text-gray-600 mt-1">You will add more details later, like bed types.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          
          {/* Guests */}
          <div className="py-3 grid grid-cols-2 items-center gap-4 border-b border-(--line)">
            <div className="font-medium text-(--ink)">Guests</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  -
              </button>
              <span className="mx-2 w-4 text-center font-medium">{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  +
              </button>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="py-3 grid grid-cols-2 items-center gap-4  border-b border-(--line)">
            <div className="font-medium text-(--ink)">Bedrooms</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  -
              </button>
              <span className="mx-2 w-4 text-center font-medium">{bedrooms}</span>
              <button
                onClick={() => setBedrooms(bedrooms + 1)}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  +
              </button>
            </div>
          </div>

          {/* Beds */}
          <div className="py-3 grid grid-cols-2 items-center gap-4 border-b border-(--line)">
            <div className="font-medium text-(--ink)">Beds</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBeds(Math.max(1, beds - 1))}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  -
              </button>
              <span className="mx-2 w-4 text-center font-medium">{beds}</span>
              <button
                onClick={() => setBeds(beds + 1)}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  +
              </button>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="py-3 grid grid-cols-2 items-center gap-4 border-b border-(--line)">
            <div className="font-medium text-(--ink)">Bathrooms</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  -
              </button>
              <span className="mx-2 w-4 text-center font-medium">{bathrooms}</span>
              <button
                onClick={() => setBathrooms(bathrooms + 1)}
                className="cursor-pointer w-9 h-9 md:w-8 md:h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors text-lg">
                  +
              </button>
            </div>
          </div>

        </div>
      </div>

        <div className="mt-8 w-full max-w-xl flex justify-end">
            <button 
                className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto" 
                onClick={() => handleNext(propertyId)} 
            >
                Next
            </button>
        </div>
    </div>
  );
};

export default FloorPlan;
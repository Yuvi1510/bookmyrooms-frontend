import { useState } from "react";
import { useNavigate } from "react-router";
import {toast} from "react-toastify";

const FloorPlan = () => {
    const [guests, setGuests] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [beds, setBeds] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);

    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/host/listings/new/stand-out");
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-6 bg-(--light-yellow) rounded-lg shadow-md  w-full md:w-[50%]">
        <div>
          <h1 className="text-2xl font-bold ">Tell us about your place</h1>
          <p>You will add more details later, like bed types.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6">
          <div className="py-3 flex items-center justify-between border-b border-(--line)">
            <div className="font-medium">Guests</div>
            <div className="flex items-center gap-2">
              <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">
                -
              </button>
              <span className="mx-2">{guests}</span>
              <button
              onClick={() => setGuests(guests + 1)}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">+</button>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between border-b border-(--line)">
            <div className="font-medium">Bedrooms</div>
            <div className="flex items-center gap-2">
              <button
              onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">
                -
              </button>
              <span className="mx-2">{bedrooms}</span>
              <button
              onClick={() => setBedrooms(bedrooms + 1)}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">+</button>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between border-b border-(--line)">
            <div className="font-medium">Beds</div>
            <div className="flex items-center gap-2">
              <button
              onClick={() => setBeds(Math.max(1, beds - 1))}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">
                -
              </button>
              <span className="mx-2">{beds}</span>
              <button
              onClick={() => setBeds(beds + 1)}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">+</button>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between border-b border-(--line)">
            <div className="font-medium">Bathrooms</div>
            <div className="flex items-center gap-2">
              <button
              onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">
                -
              </button>
              <span className="mx-2">{bathrooms}</span>
              <button
              onClick={() => setBathrooms(bathrooms + 1)}
              className="cursor-pointer w-8 h-8 rounded-full bg-(--light-gray) hover:bg-(--line) flex items-center justify-center transition-colors ">+</button>
            </div>
          </div>
        </div>

       
      </div>
       <div className="mt-6">
            <button className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-bold py-2 px-4 rounded-md transition-colors" onClick={handleNext}>
                Next
            </button>
        </div>
    </div>
  );
};

export default FloorPlan;

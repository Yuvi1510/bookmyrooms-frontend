import { getAmmenitiesIcon } from "../../../js/utils/ammenitiesIcon";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { updateAmenities } from "../../../js/slices/listingSlice";

const Ammenities = () => {
    const dispatch = useDispatch();
    const selectedAmenitiesFromStore = useSelector((state) => state.listing.newListing.amenities);
    const [selectedAmenities, setselectedAmenities] = useState(selectedAmenitiesFromStore || []);
    const navigate = useNavigate();


    const ammenities = [
        "Wifi",
        "TV",
        "Air Conditioning",
        "Kitchen",
        "Washer",
        "Dryer",
        "Free Parking",
        "Pool",
        "Hot Tub",
        "Gym"
    ]


    const handleAmmenityClick = (ammenity) => {
        if (selectedAmenities.includes(ammenity)) {
            setselectedAmenities(selectedAmenities.filter(item => item !== ammenity));
        } else {
            setselectedAmenities([...selectedAmenities, ammenity]);
        }
        
    };

    const handleNext = () => {
        if(selectedAmenities.length === 0) {
            toast.error("Please select at least one amenity before proceeding.",{
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        dispatch(updateAmenities(selectedAmenities));
        navigate("/host/listings/new/title");
    }


  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <div>
            <h1>Tell your guests about the amenities you offer</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
            {ammenities.map((ammenity, index) => {
                const IconComponent = getAmmenitiesIcon(ammenity);
                return (
                    <div 
                    onClick={() => {handleAmmenityClick(ammenity)}}
                    className={`bg-(--dark-gray) hover:bg-(--light-gray) border border-(--gray) rounded-lg p-4 cursor-pointer ${selectedAmenities.includes(ammenity) ? 'bg-(--light-gray)' : ''}`}
                    key={index} >
                        {IconComponent && <IconComponent className="w-6 h-6" />}
                        <span>{ammenity}</span>
                    </div>
                );
            })}
        </div>
         <div className=" mt-5 md:mt-10 flex justify-center">
            <button className="bg-(--dark-pink) hover:bg-(--dark-pink-hover)  text-white font-bold py-2 px-4 rounded mt-4" onClick={handleNext}>Next</button>
        </div>
    </div>
  )
}

export default Ammenities;
import { getAmmenitiesIcon } from "../../../js/utils/ammenitiesIcon";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Fixed import
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setAmenities } from "../../../js/slices/roomSlice";

const Amenities = () => {
    const { propertyId } = useParams();
    const dispatch = useDispatch();
    const selectedAmenitiesFromStore = useSelector((state) => state.room.newRoom.amenities);
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

    const handleNext = (propertyId) => {
        if (selectedAmenities.length === 0) {
            toast.error("Please select at least one amenity before proceeding.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        dispatch(setAmenities(selectedAmenities));
        navigate(`/host/listings/${propertyId}/rooms/new/floor-plan`);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10">
            <div className="text-center mb-6">
                <h1 className="text-lg md:text-3xl  font-bold text-(--ink)">Tell your guests about the amenities you offer</h1>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-4 w-full max-w-4xl">
                {ammenities.map((ammenity, index) => {
                    const IconComponent = getAmmenitiesIcon(ammenity);
                    const isSelected = selectedAmenities.includes(ammenity);
                    
                    return (
                        <div
                            onClick={() => { handleAmmenityClick(ammenity) }}
                            className={`flex flex-col items-center justify-center text-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-200
                                ${isSelected 
                                    ? 'bg-(--light-gray) border-(--dark-pink)' 
                                    : 'bg-(--dark-gray) border-(--gray) hover:bg-(--light-gray)'
                                }`}
                            key={index}
                        >
                            {IconComponent && <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-(--ink)" />}
                            <span className="text-sm md:text-base font-medium text-(--ink)">{ammenity}</span>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-10 flex justify-center w-full">
                <button
                    onClick={() => handleNext(propertyId)}
                    className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-bold py-2.5 px-8 rounded-lg transition-colors w-full sm:w-auto"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Amenities;
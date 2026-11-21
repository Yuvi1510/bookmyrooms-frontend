import { useState } from 'react';
import { BedDouble } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {setBasicInfo} from "../../../js/slices/roomSlice";

const AddRoom = () => {
    const {propertyId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // 1. Setup state for the form
    const [formData, setFormData] = useState({
        roomNumber: useSelector((state) => state.room.newRoom.roomNumber) || '',
        areaInSqFt: useSelector((state) => state.room.newRoom.areaInSqFt) || '',
        roomType: useSelector((state) => state.room.newRoom.roomType) || 'BASIC', // Default selection
    });

    // room types and basix descriptions
    const roomTypes = [
        { id: 'BASIC', label: 'Basic', desc: 'Essential amenities, budget friendly.' },
        { id: 'STANDARD', label: 'Standard', desc: 'Comfortable stay with extra space.' },
        { id: 'PREMIUM', label: 'Premium', desc: 'Luxury experience, top-tier amenities.' },
    ];

    // 2. Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. Handle next
    const handleNext = (propertyId) => {
        dispatch(setBasicInfo(formData)); // Save to Redux store
        navigate(`/host/listings/${propertyId}/rooms/new/amenities`);

    }

    return (
        <div className="h-screen flex flec-col items-center justify-center">

        <div className=" max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                    <h2 className="text-xl font-bold text-(--ink)">Add New Room</h2>
                    <p className="text-sm text-gray-500">Create a bookable room for this property.</p>
                </div>
            
            </div>

            {/* Form Body */}
            <div  className="p-6 space-y-6">
                
                {/* Room Number & Area Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                             Room Number
                        </label>
                        <input
                            type="text"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            placeholder="e.g. 101"
                            className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-(--dark-pink) focus:ring-1 focus:ring-(--dark-pink) transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                             Area (sq ft)
                        </label>
                        <input
                            type="number"
                            name="areaInSqFt"
                            value={formData.areaInSqFt}
                            onChange={handleChange}
                            placeholder="e.g. 250"
                            className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-(--dark-pink) focus:ring-1 focus:ring-(--dark-pink) transition-all"
                        />
                    </div>
                </div>

                {/* Room Type Selection (Custom Cards) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-gray-400" /> Room Type
                    </label>
                    
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {roomTypes.map((type) => (
                            <div
                                key={type.id}
                                onClick={() => setFormData({ ...formData, roomType: type.id })}
                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex justify-between items-center
                                    ${formData.roomType === type.id 
                                        ? 'border-(--dark-pink) bg-(--pale-pink)' 
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }
                                `}
                            >
                                <div>
                                    <h4 className={`font-bold ${formData.roomType === type.id ? 'text-(--dark-pink)' : 'text-gray-800'}`}>
                                        {type.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
                                </div>
                                
                                {/* Custom Radio Circle */}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${formData.roomType === type.id ? 'border-(--dark-pink)' : 'border-gray-300'}
                                `}>
                                    {formData.roomType === type.id && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-(--dark-pink)"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button onClick={() => handleNext(propertyId)} className="flex-1 bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white">
                        Next
                    </Button>
                </div>
            </div>
        </div>

        </div>
        
    );
};

export default AddRoom;
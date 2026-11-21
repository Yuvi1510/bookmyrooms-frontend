import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom"; // Fixed import
import { useSelector, useDispatch } from 'react-redux';
import { updatePrice } from "../../../js/slices/listingSlice";

const Pricing = () => {
    const dispatch = useDispatch();
    const priceFromStore = useSelector((state) => state.room.newRoom.pricing);
    const [basePrice, setBasePrice] = useState(priceFromStore.basePrice || 1200);
    const [weekendAdjustment, setWeekendAdjustment] = useState(priceFromStore.weekendAdjustment || 5);
    const [cleaningFee, setCleaningFee] = useState(priceFromStore.cleaningFee || 300);

    const [tempBasePrice, setTempBasePrice] = useState(basePrice);
    const [tempWeekendAdjustment, setTempWeekendAdjustment] = useState(weekendAdjustment);
    const [tempCleaningFee, setTempCleaningFee] = useState(cleaningFee);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const { propertyId } = useParams(); // Get propertyId from URL params

    const handleNext = (propertyId) => {
        dispatch(updatePrice({ basePrice, weekendAdjustment, cleaningFee }));
        navigate(`/host/listings/${propertyId}/rooms/new/photos`);
    }

    useEffect(() => {
        setTempBasePrice(basePrice);
        setTempWeekendAdjustment(weekendAdjustment);
        setTempCleaningFee(cleaningFee)
    }, [basePrice, cleaningFee, weekendAdjustment, showForm])

    const handleBasePriceChange = (action) => {
        if (basePrice === 1) return;
        if (action === "increase") setBasePrice(basePrice + 1);
        else if (action === "decrease") setBasePrice(basePrice - 1);
    }

    const handleWeekendAdjustmentChange = (action) => {
        if ((weekendAdjustment === 0 && action === "decrease") || (weekendAdjustment === 100 && action === "increase")) return;
        if (action === "increase") setWeekendAdjustment(weekendAdjustment + 1);
        else if (action === "decrease") setWeekendAdjustment(weekendAdjustment - 1);
    }

    const handleCleaningFeeChange = (action) => {
        if ((cleaningFee === 0 && action === "decrease")) return;
        if (action === "increase") setCleaningFee(cleaningFee + 1);
        else if (action === "decrease") setCleaningFee(cleaningFee - 1);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-(--ink)">Let's set your pricing</h1>
            
            <div className="w-full max-w-xl">
                {/* Base Price Card */}
                <div 
                    onClick={() => setShowForm(true)}
                    className="w-full min-h-[4.5rem] py-2 border-2 flex flex-col justify-center px-4 mt-4 rounded-xl cursor-pointer hover:border-(--dark-pink) transition-colors"
                >
                    <div className="font-medium text-gray-500">Base price:</div>
                    <div className="font-bold text-xl flex justify-between items-center">
                        <span>Rs.{basePrice}</span>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => {e.stopPropagation(); handleBasePriceChange("increase")}}>
                                <ChevronUp className="w-5 h-5"/>
                            </button>
                             <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => {e.stopPropagation(); handleBasePriceChange("decrease")}}>
                               <ChevronDown className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Weekend Adjustment Card */}
                <div onClick={() => setShowForm(true)}
                    className="w-full min-h-[4.5rem] py-2 border-2 flex flex-col justify-center px-4 mt-4 rounded-xl cursor-pointer hover:border-(--dark-pink) transition-colors"
                >
                    <div className="font-medium text-gray-500">Weekend Adjustment:</div>
                    <div className="font-bold text-xl flex justify-between items-center">
                        <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-center">
                            <span>+{weekendAdjustment}%</span>
                            <span className="text-xs sm:text-sm font-normal text-gray-500">
                                (Rs.{basePrice + (basePrice * weekendAdjustment / 100)} on Fri & Sat)
                            </span>
                        </div>
                        
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => {e.stopPropagation(); handleWeekendAdjustmentChange("increase")}}>
                                <ChevronUp className="w-5 h-5"/>
                            </button>
                             <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => {e.stopPropagation(); handleWeekendAdjustmentChange("decrease")}}>
                               <ChevronDown className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cleaning Fee Card */}
                <div onClick={() => setShowForm(true)}
                    className="w-full min-h-[4.5rem] py-2 border-2 flex flex-col justify-center px-4 mt-4 rounded-xl cursor-pointer hover:border-(--dark-pink) transition-colors"
                >
                    <div className="font-medium text-gray-500">Cleaning Fee:</div>
                    <div className="font-bold text-xl flex justify-between items-center">
                        <span>Rs.{cleaningFee}</span>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => {e.stopPropagation(); handleCleaningFeeChange("increase")}}>
                                <ChevronUp className="w-5 h-5"/>
                            </button>
                             <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => {e.stopPropagation(); handleCleaningFeeChange("decrease")}}>
                               <ChevronDown className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Next Button */}
                <div className="w-full flex justify-end mt-6">
                    <button
                        onClick={() => handleNext(propertyId)}
                        className="px-6 py-2.5 rounded-lg bg-(--dark-pink) text-white font-medium hover:bg-(--dark-pink-hover) transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
                    <div className="relative bg-white p-6 md:p-8 rounded-2xl w-full max-w-md flex flex-col shadow-xl">
                        
                        <button 
                            onClick={() => setShowForm(false)} 
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                            X
                        </button>
                        
                        <div className="mb-4">
                            <p className="text-xl font-bold text-(--ink)">Set Pricing</p>
                        </div>
                        
                        <div className="w-full flex flex-col gap-4 border-2 rounded-xl border-gray-200 p-4">
                            <div className="flex flex-col gap-1">
                                <label className="font-medium text-gray-700">Base Price:</label>
                                <input type="number" value={tempBasePrice}
                                    onChange={(e)=> setTempBasePrice(Math.max(0, e.target.value))}
                                    className="border-2 rounded-lg p-2 w-full outline-none focus:border-(--dark-pink)"/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-medium text-gray-700">Weekend Adjustment (%):</label>
                                <input type="number" value={tempWeekendAdjustment}
                                    onChange={(e)=> setTempWeekendAdjustment(Math.max(0, e.target.value))} 
                                    className="border-2 rounded-lg p-2 w-full outline-none focus:border-(--dark-pink)"/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-medium text-gray-700">Cleaning Fee:</label>
                                <input type="number" value={tempCleaningFee}
                                    onChange={(e)=> setTempCleaningFee(Math.max(0, e.target.value))} 
                                    className="border-2 rounded-lg p-2 w-full outline-none focus:border-(--dark-pink)"/>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setBasePrice(tempBasePrice);
                                setWeekendAdjustment(tempWeekendAdjustment);
                                setCleaningFee(tempCleaningFee);
                                setShowForm(false);
                            }}
                            className="w-full py-2.5 mt-6 rounded-xl bg-(--dark-pink) text-white font-medium hover:bg-(--dark-pink-hover) transition-colors"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pricing
import {useState, useRef, useEffect} from "react";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import { updatePrice } from "../../../js/slices/listingSlice";

const Pricing = () => {
    const dispatch = useDispatch();
    const priceFromStore = useSelector((state) => state.listing.newListing.price);
    const [basePrice, setBasePrice] = useState(priceFromStore.basePrice || 1200);
    const [weekendAdjustment, setWeekendAdjustment] = useState(priceFromStore.weekendAdjustment || 5);
    const [cleaningFee, setCleaningFee] = useState(priceFromStore.cleaningFee || 300);

    // temp store for changing the price only if user clicks ok in the form modal
    const [tempBasePrice, setTempBasePrice] = useState(basePrice);
    const [tempWeekendAdjustment, setTempWeekendAdjustment] = useState(weekendAdjustment);
    const [tempCleaningFee, setTempCleaningFee] = useState(cleaningFee);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        // update the redux store
        dispatch(updatePrice({basePrice, weekendAdjustment, cleaningFee}));
        navigate("/host/listings/new/photos");
    }

    // sync the actual price and temporary price 
    useEffect(()=>{
        setTempBasePrice(basePrice);
        setTempWeekendAdjustment(weekendAdjustment);
        setTempCleaningFee(cleaningFee)
    },[basePrice, cleaningFee, weekendAdjustment, showForm])

    const handleBasePriceChange = (action) => {
        if(basePrice === 1){
            return;
        }
        if(action === "increase"){
            setBasePrice(basePrice + 1);
        }else if(action === "decrease"){
            setBasePrice(basePrice - 1);
        }
    }

    const handleWeekendAdjustmentChange = (action) => {
        if((weekendAdjustment === 0 && action === "decrease") || (weekendAdjustment === 100 && action === "increase")){
            return;
        }
        if(action === "increase"){
            setWeekendAdjustment(weekendAdjustment + 1);
        }else if(action === "decrease"){
            setWeekendAdjustment(weekendAdjustment - 1);
        }
    }   

    const handleCleaningFeeChange = (action) => {
        if((cleaningFee === 0 && action === "decrease")){
            return;
        }
        if(action === "increase"){
            setCleaningFee(cleaningFee + 1);
        }else if(action === "decrease"){
            setCleaningFee(cleaningFee - 1);
        }
    }

    return (
        <div className="h-screen  flex flex-col justify-center items-center">
            <h1>Let's set your pricing</h1>
            <div className="w-1/2">
                <div 
                onClick={() => setShowForm(true)}
                className="w-full h-16 border-2 flex flex-col justify-center px-2 mt-4 rounded-lg cursor-pointer">
                    <div className="font-medium text-gray-500">Base price:</div>
                    <div className="font-bold text-xl flex justify-between ">
                        <span>Rs.{basePrice}</span>
                        <div>
                            <button className="mx-1 rounded-full" onClick={(e) => {e.stopPropagation(); handleBasePriceChange("increase")}}>
                                <ChevronUp/>
                            </button>
                             <button className="mx-1 rounded-full" onClick={(e) => {e.stopPropagation(); handleBasePriceChange("decrease")}}>
                               <ChevronDown/>
                            </button>
                        </div>
                    </div>
                </div>

                <div onClick={() => setShowForm(true)}
                className="w-full h-16 border-2 flex flex-col justify-center px-2 mt-4 rounded-lg cursor-pointer">
                    <div className="font-medium text-gray-500">Weekend Adjustment:</div>
                    <div className="font-bold text-xl flex justify-between ">
                        <div className=" flex  gap-2 items-center justify-center ">
                            <span>+{weekendAdjustment}%</span>
                            <span className="text-sm text-gray-500">Rs.{basePrice + (basePrice * weekendAdjustment / 100)} on Friday and Saturday

                            </span>
                        </div>
                        
                        <div>
                            <button className="mx-1 rounded-full" onClick={(e) => {e.stopPropagation(); handleWeekendAdjustmentChange("increase")}}>
                                <ChevronUp/>
                            </button>
                             <button className="mx-1 rounded-full" onClick={(e) => {e.stopPropagation(); handleWeekendAdjustmentChange("decrease")}}>
                               <ChevronDown/>
                            </button>
                        </div>
                    </div>
                </div>

                <div onClick={() => setShowForm(true)}
                className="w-full h-16 border-2 flex flex-col justify-center px-2 mt-4 rounded-lg cursor-pointer">
                    <div className="font-medium text-gray-500">Cleaning Fee:</div>
                    <div className="font-bold text-xl flex justify-between ">
                        <span>Rs.{cleaningFee}</span>
                        <div>
                            <button className="mx-1 rounded-full" onClick={(e) => {e.stopPropagation(); handleCleaningFeeChange("increase")}}>
                                <ChevronUp/>
                            </button>
                             <button className="mx-1 rounded-full" onClick={(e) => {e.stopPropagation(); handleCleaningFeeChange("decrease")}}>
                               <ChevronDown/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end mt-4 px-4">
                    <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg">Next</button>
                </div>
            </div>


{/* form modal to set the price */}
            {
          showForm && (
            <div className={`fixed h-screen inset-0  z-10 bg-black/50 flex justify-center items-center`}>
              <div className="relative bg-white p-8 rounded-lg w-1/2 h-1/2 flex flex-col justify-between items-center">
              <div className="absolute top-4 right-4">
                <button onClick={() => setShowForm(false)} className=" w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700">
                  X
                </button>
              </div>
               <div className="">
                 <p className="text-xl font-bold">Set Pricing</p>
               </div>
               <div className="w-full h-full m-2 border-2 rounded-lg border-(--gray) p-2">
                    <div className="flex sm:flex-col gap-2">
                        <p className="font-medium">Base Price:</p>
                        <input type="number" value={tempBasePrice}
                        onChange={(e)=> setTempBasePrice(Math.max(0, e.target.value))}
                        className="border-2 rounded-lg p-1 w-full"/>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                        <p className="font-medium">Weekend Adjustment:</p>
                        <input type="number" value={tempWeekendAdjustment}
                        onChange={(e)=> setTempWeekendAdjustment(Math.max(0, e.target.value))} className="border-2 rounded-lg p-1 w-full"/>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                        <p className="font-medium">Cleaning Fee:</p>
                        <input type="number" value={tempCleaningFee}
                        onChange={(e)=> setTempCleaningFee(Math.max(0, e.target.value))} className="border-2 rounded-lg p-1 w-full"/>
                    </div>
                  
               </div>

               <button
               onClick={() => {
                // set the price
                setBasePrice(tempBasePrice);
                setWeekendAdjustment(tempWeekendAdjustment);
                setCleaningFee(tempCleaningFee);
                //close the form
                setShowForm(false);
               }}
               className="px-5 py-1 rounded-xl mt-2">Ok</button>
              </div>
            </div>
          )
        }
        </div>
    )
}

export default Pricing
import {useState} from "react";
import { ChevronUp, ChevronDown } from 'lucide-react';

const Pricing = () => {
    const [basePrice, setBasePrice] = useState(1200);
    const [weekendAdjustment, setWeekendAdjustment] = useState(2);
    const [cleaningFee, setCleaningFee] = useState(300);

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
                <div className="w-full h-16 border-2 flex flex-col justify-center px-2 mt-4 rounded-lg">
                    <div className="font-medium text-gray-500">Base price:</div>
                    <div className="font-bold text-xl flex justify-between ">
                        <span>Rs.{basePrice}</span>
                        <div>
                            <button className="mx-1 rounded-full" onClick={() => handleBasePriceChange("increase")}>
                                <ChevronUp/>
                            </button>
                             <button className="mx-1 rounded-full" onClick={() => handleBasePriceChange("decrease")}>
                               <ChevronDown/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-16 border-2 flex flex-col justify-center px-2 mt-4 rounded-lg">
                    <div className="font-medium text-gray-500">Weekend Adjustment:</div>
                    <div className="font-bold text-xl flex justify-between ">
                        <span>+{weekendAdjustment}% <span className="text-sm text-gray-500">Rs.{basePrice + (basePrice * weekendAdjustment / 100)} on Friday and Saturday</span></span>
                        
                        <div>
                            <button className="mx-1 rounded-full" onClick={() => handleWeekendAdjustmentChange("increase")}>
                                <ChevronUp/>
                            </button>
                             <button className="mx-1 rounded-full" onClick={() => handleWeekendAdjustmentChange("decrease")}>
                               <ChevronDown/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-16 border-2 flex flex-col justify-center px-2 mt-4 rounded-lg">
                    <div className="font-medium text-gray-500">Cleaning Fee:</div>
                    <div className="font-bold text-xl flex justify-between ">
                        <span>Rs.{cleaningFee}</span>
                        <div>
                            <button className="mx-1 rounded-full" onClick={() => handleCleaningFeeChange("increase")}>
                                <ChevronUp/>
                            </button>
                             <button className="mx-1 rounded-full" onClick={() => handleCleaningFeeChange("decrease")}>
                               <ChevronDown/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing
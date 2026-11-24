import { Share, Heart, Star, Loader2 } from "lucide-react"; 
const RoomDetailsMain = ({room}) => {
     const amenities = [];
    const guests = Array.from({ length: room.guests }, (_, i) => i + 1); // Create an array [1, 2, ..., room.guests]
    // Extract amenities names
    for (const amm of room.amenities) {
        amenities.push(amm.name);
    }


    return(

                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Left Column: Details */}
                    <div className="flex-1">
                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {room.property.privacyOption.type} in {room.property.propertyAddress.city}
                            </h2>
                            <p className="text-gray-600">
                                {room.guests} guests - {room.bedrooms} bedroom - {room.beds} beds - {room.bathrooms} bath
                                {room.areaInSqFt && ` - ${room.areaInSqFt} sq ft`}
                            </p>
                        </div>

                         <div className="border-b border-gray-200 pb-6 mb-6">
                            <span className="text-lg font-semibold mb-3">Hosted by: </span>
                            <span className="text-gray-700 whitespace-pre-line leading-relaxed">
                                {room.property?.host?.username || "Username"}
                            </span>
                        </div>

                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">About this space</h3>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                {room.property?.description || "No description provided."}
                            </p>
                        </div>
                        
                       
                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">What this place offers</h3>
                            <p className="text-gray-500 text-sm italic">{amenities?.join(", ") || "No amenities available."}</p>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="lg:w-95 shrink-0">
                        <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">Rs. {room.basePrice}</span>
                                    <span className="text-gray-500 ml-1">/ night(includes all Fees)</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Star className="w-3 h-3 fill-gray-800 mr-1" />
                                    <span>5.0</span>
                                </div>
                            </div>

                            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                                <div className="flex border-b border-gray-300">
                                    <div className="flex-1 p-3 border-r border-gray-300">
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Check-in</label>
                                        <input type="date" className="w-full outline-none text-sm text-gray-700 bg-transparent" />
                                    </div>
                                    <div className="flex-1 p-3">
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Checkout</label>
                                        <input type="date" className="w-full outline-none text-sm text-gray-700 bg-transparent" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Guests</label>
                                    <select className="w-full outline-none text-sm text-gray-700 bg-transparent">
                                        {guests.map((guestCount) => (
                                            <option key={guestCount} value={guestCount}>
                                                {guestCount} {guestCount === 1 ? "guest" : "guests"}
                                            </option>
                                        ))}                    
            
                                    </select>
                                </div>
                            </div>

                            <button className="w-full bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-bold py-3 rounded-lg transition-colors mb-4">
                                Reserve
                            </button>

                            <p className="text-center text-sm text-gray-500 mb-4">You won't be charged yet</p>

                            <div className="space-y-3 pt-4 border-t border-gray-200 text-gray-600 text-sm">
                                <div className="flex justify-between">
                                    <span className="underline cursor-pointer">Rs. {room.basePrice} x 5 nights</span>
                                    <span>Rs. {room.basePrice * 5}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline cursor-pointer">Cleaning fee</span>
                                    <span>Rs. {room.cleaningFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline cursor-pointer">Weekend adjustment ({room.weekendAdjustment}%)</span>
                                    <span>Included</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-200 mt-3">
                                    <span>Total before taxes</span>
                                    <span>Rs. {(room.basePrice * 5) + room.cleaningFee}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
    )
}

export default RoomDetailsMain
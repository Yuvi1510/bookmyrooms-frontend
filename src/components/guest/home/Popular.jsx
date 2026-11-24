import React, { useEffect, useState } from 'react';
import axiosClient from "../../../js/services/axiosClient";
import { useNavigate } from 'react-router';


const Popular = () => {
    const [popularRooms, setPopularRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPopularRooms = async () => {
        try {
            const response = await axiosClient.get('/rooms');
            const data = response.data.content;
            setPopularRooms(data);
        } catch (error) {
            console.error('Error fetching popular rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopularRooms();
    }, []);

    const formatText = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--dark-pink)"></div>
            </div>
        );
    }

    // Fallback image if the room has no images
    const fallbackImage = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80";

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-(--ink) mb-8">Popular Rooms</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularRooms.map((room) => {
                    const imageUrl = room.imageNames?.length > 0 
                        ? `http://localhost:8080/api/images/rooms?img=${room.imageNames[0]}` 
                        : fallbackImage;

                    // const propertyType = room.property?.privacyOption?.type === "Entire Place" 
                    //     ? formatText(room.property?.propertyType) 
                    //     : "Room";

                    const propertyType = formatText(room.property?.propertyType);
                    const city = room.property?.propertyAddress?.city || "Nepal";
                    
                    return (
                        <div key={room.roomId} 
                        onClick={() => navigate(`/rooms/${room.roomId}`)}
                        className="shadow-sm rounded-md hover:shadow-md group cursor-pointer flex flex-col">
                            
                            {/* Image Container */}
                            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gray-100 mb-3">
                                <img
                                    src={imageUrl}
                                    alt={propertyType}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => { e.target.src = fallbackImage; }}
                                />
                            </div>

                            {/* Details Container */}
                            <div className="flex flex-col grow p-2">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="text-base font-semibold text-(--ink) line-clamp-1">
                                        {propertyType} in {city}
                                    </h3>
                                </div>
                                
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="font-bold text-(--ink) text-base">
                                        Rs. {room.basePrice + room.cleaningFee}
                                    </span> 
                                    {" "}per night
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Includes Rs. {room.cleaningFee} cleaning fee
                                </p>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Popular;
import { useParams } from "react-router-dom"; 
import GuestNavbar from "../GuestNavbar";
import { useEffect, useState } from "react";
import axiosClient from "../../../js/services/axiosClient";
import { Share, Heart, Star, Loader2 } from "lucide-react"; 
import RoomDetailsImages from "./RoomDetailsImages"; 
import RoomDetailsHeader from "./RoomDetailsHeader";
import RoomDetailsMain from "./RoomDetailsMain";


const RoomDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    const fetchRoomDetails = async () => {
        try {
            const response = await axiosClient.get(`/rooms/${roomId}`);
            setRoom(response.data); 
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching room details:", error);
        } finally {
            setLoading(false);
        }
    }


    
  
    if (loading) {
        return (
            <>
                <GuestNavbar />
                <div className="h-[80vh] flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-(--dark-pink)" />
                </div>
            </>
        );
    }

    if (!room) {
        return (
            <>
                <GuestNavbar />
                <div className="h-[80vh] flex items-center justify-center">
                    <p className="text-xl text-gray-500">Room not found.</p>
                </div>
            </>
        );
    }

    // Extract data 
    const images = room.imageNames;
    const roomNumber = room.roomNumber;
    const city = room.property.propertyAddress.city ;
    const country = room.property.propertyAddress.country;
    const privacyType = room.property.privacyOption.type;
    const propertyType = room.property.propertyType;
   
    return (
        <>
            <GuestNavbar />
            <div className="max-w-6xl mx-auto px-4 py-6 mt-16"> 
                
                {/* Header Section */}
                <RoomDetailsHeader 
                    room={room}
                />

                {/* Image Grid Section */}
               <RoomDetailsImages images={images} />


                <RoomDetailsMain  room={room} />
            </div>
        </>
    );
}

export default RoomDetails;
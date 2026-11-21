import PhotoForm from "@/components/common/PhotoForm"
import {useSelector} from "react-redux";
import {useParams} from "react-router";

const RoomPhoto = () => {
    const formData = useSelector((state) => state.room.newRoom); // Get new room data from Redux store
    const {propertyId} = useParams();

    return (
        <div>
                <PhotoForm
                
                title="Add photos of your room" 
                description="Upload multiple photos of your room." 
                formData={formData} allowMultiple={true} uploadUrl={`/rooms/add?propertyId=${propertyId}`} 
                redirectUrl={`/host/listings/${propertyId}`}
                />
        </div>
    )
}

export default RoomPhoto
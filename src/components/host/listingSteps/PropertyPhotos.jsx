
import {useSelector} from "react-redux";
import PhotoForm from "@/components/common/PhotoForm";
import {useParams} from "react-router";


const PropertyPhotos = () => {
  
  const listingData = useSelector((state) => state.listing.newListing); // Get listing data from Redux store

  return (
    <PhotoForm 
      title="Add a photo of your place" 
      description="Upload only one photo of your place." 
      formData={listingData} 
      allowMultiple={false} 
      uploadUrl="/properties/add"
      redirectUrl="/host/listings"
    />
  )
}

export default PropertyPhotos;
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react"; // Optional: Adds a nice touch to the location

const PropertyCard = ({ listing }) => {

    const handleCardClick = () => {
        // Navigate to the property details page
        window.location.href = `/host/listings/${listing.propertyId}`;
    }

  return (
   
    <div onClick={handleCardClick} className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
      
    
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:8080/api/images/properties?img=${listing.imageName}`}
          alt={listing.title}
          
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
      
        <Badge 
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md ${
            listing.verified 
              ? "bg-(--success) hover:bg-(--success) text-white" 
              : "bg-(--error) hover:bg-(--error) text-white"
          }`}
        >
          {listing.verified ? "Verified" : "Not Verified"}
        </Badge>
      </div>

    
      <div className="p-4 flex flex-col grow text-(--ink)">
        
        <h3 className="text-lg font-bold line-clamp-1">{listing.title}</h3>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 grow">
          {listing.description}
        </p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-sm font-medium text-gray-600">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          {listing.address?.city}, {listing.address?.country}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
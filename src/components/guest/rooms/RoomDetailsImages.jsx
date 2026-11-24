import {  Grid } from "lucide-react"; 


const RoomDetailsImages = ({ images }) => {

    // helper function to construct image URL
    const getImageUrl = (imgName) => `http://localhost:8080/api/images/rooms?img=${imgName}`;

      
    // Fallback image if none exist
    const fallbackImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

    return (
         <div className="relative w-full h-75 md:h-112.5 rounded-2xl overflow-hidden mb-8">
                    {images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-full">
                            {/* Main Large Image */}
                            <div className="md:col-span-2 md:row-span-2 h-full cursor-pointer overflow-hidden">
                                <img 
                                    src={getImageUrl(images[0])} 
                                    alt="Main Room" 
                                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                    onError={(e) => e.target.src = fallbackImage}
                                />
                            </div>
                            
                            {/* Smaller Images (Only show if we have them) */}
                            {images.slice(1, 5).map((img, index) => (
                                <div key={index} className="hidden md:block h-full cursor-pointer overflow-hidden">
                                    <img 
                                        src={getImageUrl(img)} 
                                        alt={`Room view ${index + 1}`} 
                                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                        onError={(e) => e.target.src = fallbackImage}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <img src={fallbackImage} alt="Fallback" className="w-full h-full object-cover" />
                    )}
                    
                    {/* Show all photos button */}
                    <button className="absolute bottom-4 right-4 bg-white border border-gray-900 text-gray-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                        <Grid className="w-4 h-4" /> Show all photos
                    </button>
                </div>
    )
}

export default RoomDetailsImages
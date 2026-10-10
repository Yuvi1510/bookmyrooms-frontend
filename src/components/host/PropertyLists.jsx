import room from '../../assets/images/room.jpg';
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router';
const PropertyLists = () => {
    const listings = [
        { id: 1, img: room, name: 'Cozy Apartment', location: 'New York', price: '$120/night' },
        { id: 2, img: room, name: 'Beach House', location: 'California', price: '$250/night' },
        { id: 3, img: room, name: 'Mountain Cabin', location: 'Colorado', price: '$180/night' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2>Your Listings</h2>
                <Link to="/host/listings/new" className="bg-(--dark-pink) text-white px-4 py-2 rounded hover:bg-(--dark-pink-hover)">
                    Add New Listing
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {listings.map((listing) => (
                    <div key={listing.id} className=" relative border  rounded-lg shadow hover:shadow-lg transition-shadow">
                <Badge className="alert-badge"  variant="destructive">Action required</Badge>
                        <img src={listing.img} alt={listing.name} className="w-full h-64 object-cover rounded mb-4" />
                        <div className="px-2 text-(--ink)">
                            <h3 className="text-lg font-semibold">{listing.name}</h3>
                        <p className="">{listing.location}</p>
                        <p className=" font-medium">{listing.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
            

export default PropertyLists
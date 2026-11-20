import room from '../../../assets/images/room.jpg';
import { Link } from 'react-router';
import axiosClient from '../../../js/services/axiosClient';
import { useEffect, useState } from 'react';
import PropertyCard from '../../common/PropertyCard';

const PropertyLists = () => {

    const [listings, setListings] = useState([]);

    const fetchListings = async () => {
        try {
            const response = await axiosClient.get('/properties');
           console.log('Fetched listings:', response.data.content);
            setListings(response.data.content);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    useEffect(() => {
        // Fetch listings from the backend API
        fetchListings();
    }, []);

    return (
        <div className="h-screen flex flex-col justify-start items-center py-8 px-4 md:px-8 lg:px-16 ">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {listings.map((listing) => (
                    <PropertyCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}
            

export default PropertyLists
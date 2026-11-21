import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axiosClient from '../../../js/services/axiosClient';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    MapPin, ShieldCheck, ShieldAlert,  ArrowLeft,
    LayoutDashboard, BedDouble, CalendarDays, Edit3,  
    Trash2, Users, DollarSign, 
} from 'lucide-react';
import Overview from './Overview';
import Rooms from './Rooms';
import Bookings from './Bookings';
import Edit from './Edit';

const HostPropertyDetails = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'rooms', 'bookings', 'edit'

    // TODO: Replace these mock arrays with actual API calls later
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/properties/${propertyId}`);
                setProperty(response.data);
                
                // TODO: Fetch rooms and bookings here once the endpoints are ready
                // const roomsRes = await axiosClient.get(`/properties/${propertyId}/rooms`);
                // setRooms(roomsRes.data);
                
            } catch (err) {
                console.error('Error fetching property:', err);
                setError("Property not found.");
            } finally {
                setLoading(false);
            }
        };

        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center pt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--dark-pink)"></div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4 pt-20">
                <h2 className="text-2xl font-bold text-(--error)">{error || "Property not found"}</h2>
                <Button onClick={() => navigate('/host/listings')} variant="outline">Back to Listings</Button>
            </div>
        );
    }

    const { title, description, address, privacyOption, imageName, location, isVerified } = property;
    const imageUrl = `http://localhost:8080/api/images/properties?img=${imageName}`;

    return (
        <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
            
            {/* Navigation & Header */}
            <div className="mb-8">
                <button 
                    onClick={() => navigate('/host/listings')} 
                    className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white flex items-center gap-2 text-sm text-gray-500 hover:text-(--ink) mb-4 transition-colors p-2 "
                >
                    <ArrowLeft className="w-4 h-4" /> Back to my properties
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-(--ink) mb-1">{title}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {address?.city}, {address?.country}
                            </span>
                            <Badge className={`px-2 py-0.5 ${isVerified ? 'bg-(--success)' : 'bg-(--error)'} text-white`}>
                                {isVerified ? "Verified" : "Not Verified"}
                            </Badge>
                        </div>
                    </div>
                    
                    {/* Host Actions */}
                    <div className="flex gap-2">
                        <Button onClick={() => setActiveTab('edit')} className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white">
                            <Edit3 className="w-4 h-4 mr-2" /> Edit Listing
                        </Button>
                    </div>
                </div>
            </div>

            {/* Host Management Tabs */}
            <div className="flex space-x-1 border-b border-gray-200 mb-8 overflow-x-auto">
                {[
                    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                    { id: 'rooms', label: 'Manage Rooms', icon: BedDouble },
                    { id: 'bookings', label: 'Bookings', icon: CalendarDays },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`bg-(--dark-pink) text-white hover:bg-(--dark-pink-hover) flex items-center gap-2 py-3 px-6 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === tab.id 
                                ? 'bg-(--dark-pink-hover)' 
                                : ''
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT AREA */}
            <div className="min-h-[400px]">

                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <Overview imageUrl={imageUrl} title={title} description={description} privacyOption={privacyOption} address={address} location={location} />
                )}

                {/* 2. ROOMS TAB */}
                {activeTab === 'rooms' && (
                   <Rooms propertyId={propertyId} rooms={ rooms} />
                )}

                {/* 3. BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                   <Bookings bookings={bookings} />
                )}
                
                {/* 4. EDIT TAB (Placeholder) */}
                {activeTab === 'edit' && (
                    <Edit title={title} description={description} />
                )}
            </div>
        </div>
    );
};

export default HostPropertyDetails;
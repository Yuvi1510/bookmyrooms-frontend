import {Plus, BedDouble, Users, DollarSign, Trash2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {useNavigate, useParams} from "react-router";


const Room = ({ propertyId, rooms }) => {
    const navigate = useNavigate();

    const handleAddRoom = (propertyId) => {   
        navigate(`/host/listings/${propertyId}/rooms/new`);
    };

    return (
         <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-(--ink)">Your Rooms</h2>
                                        <p className="text-gray-500 text-sm">Manage the rooms guests can book.</p>
                                    </div>
                                    <button onClick={()=> handleAddRoom(propertyId)} className="flex items-center justify-center p-2 rounded-lg gap-2 bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white">
                                        <Plus className="w-4 h-4 mr-2" /> Add New Room
                                    </button>
                                </div>
        
                                {/* If no rooms exist yet */}
                                {rooms.length === 0 ? (
                                    <div className="flex flex-col items-center justify-centertext-center py-20 border-2 border-dashed rounded-2xl border-gray-200 bg-gray-50">
                                        <BedDouble className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700">No rooms added yet</h3>
                                        <p className="text-gray-500 mb-6">Add your first room to start receiving bookings.</p>
                                        
                                        <button onClick={()=> handleAddRoom(propertyId)} className="flex items-center justify-center p-2 rounded-lg gap-2 bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white">
                                        <Plus className="w-4 h-4 mr-2" /> Add Room
                                    </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {rooms.map((room) => (
                                            <div key={room.roomId} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg">Room {room.roomNumber}</h3>
                                                    <Badge variant="outline" className={room.available ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'}>
                                                        {room.available ? 'Available' : 'Occupied'}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                                    <p className="flex items-center gap-2"><Users className="w-4 h-4"/> {room.guests} Guests</p>
                                                    <p className="flex items-center gap-2"> Base price: RS. {room.basePrice} / night</p>
                                                    <p className="flex items-center gap-2">Cleaning Fee: RS. {room.basePrice} / night</p>
                                                </div>
                                                    <div className="flex justify-center gap-2 border-t pt-4">
                                                    <button variant="outline" size="sm" className="w-full bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white shasow-sm">
                                                        Edit
                                                    </button>
                                                    <button variant="outline" size="sm" className="w-full text-center text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 shadow-sm">
                                                        <Trash2 className="w-4 h-4 mx-auto" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
    )
}

export default Room
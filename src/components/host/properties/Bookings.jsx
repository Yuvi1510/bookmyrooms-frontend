import { CalendarDays, Clock } from 'lucide-react';

const Bookings = ({bookings}) => {
    return (
         <div>
                        <h2 className="text-2xl font-bold text-(--ink) mb-6">Recent Bookings</h2>
                        
                        {bookings.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed rounded-2xl border-gray-200">
                                <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-700">No bookings yet</h3>
                                <p className="text-gray-500">When guests book your rooms, they will appear here.</p>
                            </div>
                        ) : (
                            <div className="bg-white border rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="p-4 font-medium text-gray-500">Guest</th>
                                            <th className="p-4 font-medium text-gray-500">Room</th>
                                            <th className="p-4 font-medium text-gray-500">Dates</th>
                                            <th className="p-4 font-medium text-gray-500">Status</th>
                                            <th className="p-4 font-medium text-gray-500">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50">
                                                <td className="p-4 font-medium">{booking.guestName}</td>
                                                <td className="p-4">Room {booking.roomNumber}</td>
                                                <td className="p-4 text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3"/> 
                                                        {booking.checkIn} to {booking.checkOut}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                                                </td>
                                                <td className="p-4 font-semibold">${booking.totalPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
    )
}

export default Bookings
import { Share, Heart, Star, Loader2 } from "lucide-react"; 

const RoomDetailsHeader = ({ room }) => {
    return (
        <div className="mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Stay in {room.property.propertyAddress.city} | {room.property.privacyOption.type === "Entire Place" ? `${room.property.propertyType[0] + room.property.propertyType.slice(1).toLowerCase()}`: `Room: ${room.roomNumber}`}
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-gray-800" />
                            <span className="font-semibold text-gray-900">5.0</span>
                            <span className="underline cursor-pointer">3 reviews</span>
                            <span className="mx-2">·</span>
                            <span className="font-medium">{room.property.privacyOption.type}</span>
                        </div>
                        <div className="flex gap-4 text-sm font-medium text-gray-800">
                            <button className="flex items-center gap-2 hover:bg-(--light-pink-hover) px-3 py-1.5 rounded-lg transition-colors">
                                <Share className="w-4 h-4" /> Share
                            </button>
                            <button className="flex items-center gap-2 hover:bg-(--light-pink-hover) px-3 py-1.5 rounded-lg transition-colors">
                                <Heart className="w-4 h-4" /> Save
                            </button>
                        </div>
                    </div>
                </div>
    )

}

export default RoomDetailsHeader
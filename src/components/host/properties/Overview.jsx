import {Home, Compass} from "lucide-react";

const Overview = ({ imageUrl, title, description, privacyOption, address, location }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <div className="rounded-2xl overflow-hidden h-80">
                                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">About this property</h3>
                                    <p className="text-gray-700 whitespace-pre-line">{description}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Home className="w-5 h-5 text-(--dark-pink)"/> Details
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-gray-500">Type:</span> {privacyOption?.type}</p>
                                    <p><span className="text-gray-500">Street:</span> {address?.street}</p>
                                    <p><span className="text-gray-500">Province:</span> {address?.province}</p>
                                    <p className="flex items-center gap-1 text-gray-600 mt-4 pt-4 border-t border-gray-200">
                                        <Compass className="w-4 h-4"/> 
                                        {location?.latitude}, {location?.longitude}
                                    </p>
                                </div>
                            </div>
                        </div>
  )
}
export default Overview
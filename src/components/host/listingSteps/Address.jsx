import { Link } from "react-router-dom";
import room from "../../../assets/images/room.jpg";
import { Search, Navigation, X } from "lucide-react";
import { useState } from "react";

const Address = () => {

    const [openAddressForm, setOpenAddressForm] = useState(false);  

  return (
    <div className="flex relative gap-4 justify-center pt-7">
      <div className="  flex items-center w-200 h-full  justify-center">
        <img
          src={room}
          alt="room"
          className="w-[90%] object-cover rounded-4xl mb-4"
        />
      </div>
      <div className="flex  gap-4 items-center text-center  ">
        <div className="flex flex-col gap-5 p-7">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Set Up Your Listing
            </h1>
            <h2 className="text-lg md:text-xl">Within Minutes</h2>
          </div>
          <div className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg">
            <Search className="shrink-0 text-gray-500" />
            <input
            onClick={() => setOpenAddressForm(true)}
              type="text"
              placeholder="Enter your address"
              className="p-2 w-full outline-none rounded-lg"
            />
          </div>

        </div>
      </div>

 {/* form  */}
     {openAddressForm && (
        <div id='property-address-form'   className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="p-5 bg-(--light-yellow) rounded-2xl flex flex-col gap-4 items-center justify-center">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Confirm your address</h1>
                <button onClick = {() => setOpenAddressForm(false)} className="p-2 cursor-pointer">
                    <X className=" bg-red-600 hover:bg-red-700 rounded-full" />
                </button>
            </div>
           {/* street */}
           <div>
             <input
               type="text"
               placeholder="Street"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>

           {/* city */}
           <div>
             <input
               type="text"
               placeholder="City"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>

           {/* province  */}
           <div>
             <input
               type="text"
               placeholder="Province"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>

           {/* postal code */}
           <div>
             <input
               type="text"
               placeholder="Postal Code"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>
          
          <Link to="/host/listings/new/about-property">
            <button className="bg-(--dark-pink) w-120 cursor-pointer text-white p-2 rounded-md hover:bg-(--dark-pink-hover) transition-colors">
              Next
            </button>
          </Link>
        </div>
      </div>
     )}
    </div>
  );
};

export default Address;

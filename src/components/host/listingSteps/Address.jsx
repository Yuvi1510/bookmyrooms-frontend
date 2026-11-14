import { Link } from "react-router-dom";
import room from "../../../assets/images/room.jpg";
import { Search, Navigation, X } from "lucide-react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import {updateAddress} from '../../../js/slices/listingSlice';

const Address = () => {
  const dispatch = useDispatch();
    const countries = ["Nepal", "Pakistan", "United States"];
    const [openAddressForm, setOpenAddressForm] = useState(false);  

    const addressFromStore = useSelector((state) => state.listing.newListing.address);

    const [address, setAddress] = useState({
      country: addressFromStore.country || "Nepal",
      street: addressFromStore.street || "",
      city: addressFromStore.city || "",
      province: addressFromStore.province || "",
      postalCode: addressFromStore.postalCode || "",
    });


    const navigate = useNavigate();

    const handleNext = () => {
        // setOpenAddressForm(false);
        dispatch(updateAddress(address));
        navigate("/host/listings/new/about-property");
    }

  return (
    <div className="h-screen flex justify-center items-center relative gap-4  pt-7">
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
                {/* <button onClick = {() => setOpenAddressForm(false)} className="p-2 cursor-pointer rounded-full"> */}
                    <X onClick = {() => setOpenAddressForm(false)} className=" bg-red-600 hover:bg-red-700 rounded-full" />
                {/* </button> */}
            </div>
            {/* country  */}
           <div>
            <select value={address.country}
            onChange={(e) => setAddress({...address, country: e.target.value})}
            disabled={true} className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg">
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option  key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
           </div>
              {/* street */}
           <div>
             <input
             onChange={(e) => setAddress({...address, street: e.target.value})}
             value={address.street}
               type="text"
               placeholder="Street"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>

           {/* city */}
           <div>
             <input
             onChange={(e) => setAddress({...address, city: e.target.value})}
             value={address.city}
               type="text"
               placeholder="City"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>

           {/* province  */}
           <div>
             <input
               onChange={(e) => setAddress({...address, province: e.target.value})}
               value={address.province}
               type="text"
               placeholder="Province"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>

           {/* postal code */}
           <div>
             <input
                onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                value={address.postalCode}
               type="text"
               placeholder="Postal Code"
               className="p-2  outline outline-(--dark-pink-hover) border border-(--dark-pink) w-120 rounded-lg"
             />
           </div>
          
          
            <button onClick = {handleNext} className="bg-(--dark-pink) w-120 cursor-pointer text-white p-2 rounded-md hover:bg-(--dark-pink-hover) transition-colors">
              Next
            </button>
        </div>
      </div>
     )}
    </div>
  );
};

export default Address;

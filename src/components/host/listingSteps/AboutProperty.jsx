import property from '../../../../public/images/propertyPng.png';
import { Link } from 'react-router';

const AboutProperty = () => {
  return (
    // h-screen fixed top-0 left-0 : yo css le garda purai screen cover hunxa ani navbar ko navigation le pani kam gardaina
    <div className="h-screen fixed  grid grid-cols-[2fr_1fr] top-0 left-0 gap-2 py-6 px-60 justify-center pt-7 items-center">
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <p>Step 1</p>
        <h1 className="text-2xl font-bold">Tell us about your property</h1>
        <p className = "text-(--ink) text-balance">
          In this step, we'll ask you which type of property you have and if
          guests will book the entire place or just a room. Then let us know the
          location and how many guests can stay.
          Please provide accurate information about your property to ensure a
          smooth booking experience for guests.
        </p>
         <div className=" mt-4">
        <Link className="bg-(--dark-pink) hover:bg-(--dark-pink-hover)  text-white font-bold py-2 px-4 rounded" to="/host/listings/new/structure">Next</Link>
      </div>
      </div>
      <div>
        <img
        className="w-200 object-cover rounded-4xl"
          src={property}
          alt="Property" />
      </div>

    
    </div>
  );
};

export default AboutProperty;

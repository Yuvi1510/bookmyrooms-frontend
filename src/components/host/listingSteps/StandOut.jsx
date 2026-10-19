import property from "../../../../public/images/propertyPng.png";
import { useNavigate } from "react-router";

const StandOut = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/host/listings/new/ammenities");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className=" flex justify-center items-center gap-5">
        <div className="w-md">
          <span className="text-xl font-medium">Step 2</span>
          <h1>Make your place stand out</h1>
          <p>
            In this step, you'll add some of the amenities your place offers,
            plus 5 or more photos. Then, you'll create a title and description.
          </p>
        </div>
        <div className="">
          <img className="w-full" src={property}></img>
        </div>
      </div>
      <div className=" mt-5 md:mt-10 flex justify-center">
        <button
          className="bg-(--dark-pink) hover:bg-(--dark-pink-hover)  text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StandOut;

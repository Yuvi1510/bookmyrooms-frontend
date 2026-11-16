import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import { updateDescription } from "../../../js/slices/listingSlice";

const Description = () => {
  const dispatch = useDispatch();
  const descriptionFromStore = useSelector((state) => state.listing.newListing.description);
  const [description, setDescription] = useState(descriptionFromStore);
  const [charLength, setCharLength] = useState(description.length);
  const textRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    textRef.current.focus();
  }, []);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCharLength(text.length);
  };

  const handleNext = () => {
    dispatch(updateDescription(description)); 
    navigate("/host/listings/new/photos");
  };

  return (
    <div className="h-screen  flex flex-col justify-center items-center">
      <div>
        <div>
          <h1 className="text-lg font-medium">Describe your property</h1>
          <p className="font-medium text-gray-600">
            Share what makes your place special in atleast 15 characters.
          </p>
        </div>
        <div className="flex flex-col mt-2 ">
          <textarea
          value={description}
            ref={textRef}
            className="w-full h-44 border-2 p-2 mt-4"
            maxLength={500}
            onChange={(e) => {
              setDescription(e.target.value);
              handleTextChange(e);
            }}
          ></textarea>
          <div className="flex justify-between items-center">
            <span>{charLength}/500</span>
            <button
              disabled={charLength < 15}
              className="bg-(--dark-pink) hover:bg-(--dark-pink-hover)  text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const Description = () => {
  const [charLength, setCharLength] = useState(0);
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
    navigate("/host/listings/new/pricing");
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
            ref={textRef}
            className="w-full h-44 border-2 p-2 mt-4"
            maxLength={500}
            onChange={handleTextChange}
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

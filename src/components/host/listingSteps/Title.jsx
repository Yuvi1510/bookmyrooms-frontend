import {useState, useRef, useEffect} from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

const Title = () => {

    const [charLength, setCharLemgth] = useState(0);
    const textRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
      textRef.current.focus();
    }, []);

    const changeLength = (e) => {
      setCharLemgth(e.target.value.length);
    }

    const handleNext = () => {
      if(charLength < 5) {
        toast.error("Please enter a title with atleast five characters.",{
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      navigate("/host/listings/new/description");
    };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <div>
          <h1 className="text-lg">Now let's give your property a title</h1>
          <p className="font-medium">Please enter at least five characters. You can always change it later.</p>
        </div>
        <div className="flex flex-col mt-4">
          <textarea ref={textRef} onChange={changeLength} className="w-full h-32 border-2 p-2" maxLength={50}></textarea>
          <div className="flex justify-between items-center">
            <span>{charLength}/50</span>
            <button 
            disabled={charLength < 5}
            className="bg-(--dark-pink) hover:bg-(--dark-pink-hover)  text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;

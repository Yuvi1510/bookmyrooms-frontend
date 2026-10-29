import {useState, useRef} from "react";

const Title = () => {

    const [charLength, setCharLemgth] = useState(0);
    const textRef = useRef();

    const changeLength = (e) => {
      setCharLemgth(e.target.value.length);
    }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <div>
          <h1 className="text-lg">Now let's give your property a title</h1>
          <p className="font-medium">You can always change it later</p>
        </div>
        <div className="flex flex-col mt-4">
          <textarea ref={textRef} onChange={changeLength} className="w-full h-32 border-2 p-2" maxLength={50}></textarea>
          <span>{charLength}/50</span>
        </div>
      </div>
    </div>
  );
};

export default Title;

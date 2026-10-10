import { BuildingComplex } from "lucide-react";
import { getPropertyIcon } from "../../../js/utils/propertyIcon";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import { House, DoorOpen, UserGroup } from "lucide-react";

const PrivacyType = () => {
  const navigate = useNavigate();
  const privacyOptions = [
    {
      id: 1,
      privacyType: "Entire Place",
      description: "Guests have the whole place to themselves.",
      icon: House,
    },
    {
      id: 2,
      privacyType: "Private Room",
      description:
        "Guests have their own private room in a home, plus access to shared spaces.",
      icon: DoorOpen,
    },
    {
      id: 3,
      privacyType: "Shared Room",
      description:
        "Guests share a room with others in a professionally managed space with staffs available 24/7.",
      icon: UserGroup,
    },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  // check if one option has been selelcted
  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option before proceeding.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    navigate("/host/listings/new/location");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        What type of place will guests have?
      </h1>
      <div className="grid grid-cols-1 md:w-[75%] mx-auto gap-4 mt-6 ">
        {privacyOptions.map((item) => {
          return (
            <div
              className={`
                flex items-center justify-between
                bg-(--dark-gray) hover:bg-(--light-gray) border border-(--gray) rounded-lg py-4 px-6 cursor-pointer ${selectedOption === item.privacyType ? "bg-(--light-gray)" : ""}`}
              key={item.id}
              onClick={() => handleOptionClick(item.privacyType)}
            >
              <div>
                <p className=" mt-2 font-bold">{item.privacyType}</p>
                <p className=" mt-2 text-sm">{item.description}</p>
              </div>
              <item.icon className="w-10 h-10" />
            </div>
          );
        })}
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

export default PrivacyType;

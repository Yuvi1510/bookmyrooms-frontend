import { BuildingComplex } from 'lucide-react';
import { getPropertyIcon } from '../../../js/utils/propertyIcon';
import {useNavigate} from 'react-router';
import { toast } from 'react-toastify';
import { useState } from 'react';

const PropertyStructure = () => {
    const navigate = useNavigate();
    const structureOptions = [
        { id: 1, name: 'Apartment' },
        { id: 2, name: 'House' },
        { id: 3, name: 'Villa' },
        { id: 4, name: 'Guesthouse' },
        { id: 5, name: 'Hotel' },
    ];

    const handleOptionClick = (option) => {
       setSelectedOption(option);
    }

    const [selectedOption, setSelectedOption] = useState(null);

    // check if one option has been selelcted
    const handleNext = () => {
        if (!selectedOption) {
            toast.error('Please select an option before proceeding.', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        navigate('/host/listings/new/privacy-type');
    };

    return (
        <div>
        <h1 className="text-2xl font-bold text-center">Which of these best describes your property?</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 ">
            {structureOptions.map((item) => {
                const IconComponent = getPropertyIcon(item.name);
                return(<div className={`
                bg-(--dark-gray) hover:bg-(--light-gray) border border-(--gray) rounded-lg p-4 cursor-pointer ${selectedOption === item.name ? 'bg-(--light-gray)' : ''}`} key={item.id} onClick={() => handleOptionClick(item.name)}>
                    <IconComponent className="w-12 h-12 mx-auto" />
                    <p className="text-center mt-2">{item.name}</p>
                </div>)
            })}
        </div>
        <div className=" mt-5 md:mt-10 flex justify-center">
            <button className="bg-(--dark-pink) hover:bg-(--dark-pink-hover)  text-white font-bold py-2 px-4 rounded mt-4" onClick={handleNext}>Next</button>
        </div>
        </div> 
    )
}

export default PropertyStructure;
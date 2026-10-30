import {useState, useRef, useEffect} from "react";
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

const PropertyPhotos = () => {
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const toggleForm = () => {
    //toggle the form 
    setShowForm(!showForm);
  }


  // function to handle image preview
  const handleImagePreview = (event) => {
    // create an array of images that have been selected
    const files = Array.from(event.target.files);

    // make an array of objects with the file and a preview url for each image
    const imagePreviews = files.map((f) => ({
      f,
      preview: URL.createObjectURL(f),
    }))
    
    // add the new images to the existing selected images
    setSelectedImages((prev) => [...prev, ...imagePreviews]);

    // Reset the input value so the same file can be selected again if removed
    event.target.value = null; 
  }

  // function to remove image from preview
  const removeImage = (index) => () => {
    // Revoke the URL to free up memory
    URL.revokeObjectURL(selectedImages[index].preview);

    // filter methods checks condition and returns true or false, if true it will keep the item in the array, if false it will remove it from the array
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }

  // function to handle image upload
  const handleImagesUpload = async () => {
    if (selectedImages.length < 5) {
      toast.error("Please select at least five images before uploading.",{
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("photos", image.file);
    });

    // await axiosClient.post('/listings/photos', formData);
    toast.success("Images uploaded successfully!",{
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/host/listings/new/title"); 
  }

  // cleanup memory when component unmounts
  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, []);

  return (
    <div className="position-relative h-screen flex flex-col justify-center items-center">
        <h1>Add some photos of your place</h1>
        <p className="text-(--ink) font-medium">Upload atleast five photos of your place.</p>
        <div className="mt-4 w-1/2 h-1/2 border-2 border-dashed border-gray-400 rounded-lg flex flex-col justify-center items-center">
            <img src="/images/camera.avif" alt="Camera" className="w-16 h-16" />
            <button onClick={toggleForm} className=" font-bold py-2 px-4 rounded-md mt-4">Upload Photos</button>
        </div>
        
        {
          showForm && (
            <div className={`fixed h-screen inset-0  z-10 bg-black/50 flex justify-center items-center`}>
              <div className="relative bg-white p-8 rounded-lg w-1/2 h-1/2 flex flex-col justify-between items-center">
              <div className="absolute top-4 right-4">
                <button onClick={toggleForm} className=" w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700">
                  X
                </button>
              </div>
               <div className="">
                 <p className="text-xl font-bold">Upload Photos</p>
               </div>
               <div className="w-full h-full m-2 border-2 border-dashed rounded-lg border-(--gray)
                flex flex-col items-center justify-center">
                  <p className="text-(--ink) font-medium">Select your photos</p>
                    <button onClick={() => fileInputRef.current.click()} className="px-3 py-2 rounded-lg mt-3">Browse</button>
                    <input type="file" accept="image/*" multiple ref={fileInputRef}  className="hidden"
                    onChange={handleImagePreview} />
               </div>
              </div>
            </div>
          )
        }

        {/* modal to show image preview */}
        {
          selectedImages.length > 0 && (
            <div className={`fixed h-screen inset-0  z-10 bg-black/50 flex justify-center items-center`}>
              <div className="relative bg-white p-8 rounded-lg w-1/2 h-1/2 flex flex-col justify-between items-center">
              <div className="absolute top-4 right-4">
                <button onClick={() => 
                  // set array empty to close this modal 
                  setSelectedImages([])} className=" w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700">
                  X
                </button>
              </div>
               <div className="">
                 <p className="text-xl font-bold">Preview Photos</p>
               </div>
              <div className="overflow-auto w-full border-2 mt-3  rounded-lg border-(--gray)">
                 <div className="m-2 grid grid-cols-3 gap-2 ">
                  {
                    selectedImages.map((image, index) => (
                      <div key={index} className="m-1  border-2 rounded-lg relative">
                        <button onClick={removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <Trash size={12} />
                        </button>
                        <div className="w-full h-full flex justify-center items-center">
                          <img src={image.preview} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                      </div>
                    ))
                  }
               </div>
              </div>
              <div>
                <button onClick={() => fileInputRef2.current.click()} className="px-3 py-2 rounded-lg m-3">Browse</button>
                    <input type="file" accept="image/*" multiple ref={fileInputRef2}  className="hidden"
                    onChange={handleImagePreview} />


               <button onClick={handleImagesUpload} className="px-3 py-2 rounded-lg m-3"> Upload</button>
              </div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default PropertyPhotos;
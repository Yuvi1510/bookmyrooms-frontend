import { useState, useRef, useEffect } from "react";
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axiosClient from "../../js/services/axiosClient";
import { useSelector } from "react-redux";
import Error from "../../exceptions/Error";

const PhotoForm = ({title, description, formData, allowMultiple, uploadUrl, redirectUrl }) => {
    
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleImagePreview = (event) => {
    const files = Array.from(event.target.files);

    const imagePreviews = files.map((f) => ({
      f,
      preview: URL.createObjectURL(f),
    }))
    
    setSelectedImages((prev) => [...prev, ...imagePreviews]);
    event.target.value = null; 
  }

  const removeImage = (index) => () => {
    URL.revokeObjectURL(selectedImages[index].preview);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }

  const handleUpload = async (data, uploadUrl) => {
    console.log("data", data);
    console.log("uploadUrl", uploadUrl);
    const formData = new FormData();
    
    if(data){
        const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('data', jsonBlob);
    }

    selectedImages.forEach((image) => {
        formData.append('images', image.f);
        // if multiple items are appended to the same key, it will be treated as an array on the server side
    });

    try {
      setLoading(true);
        const response = await axiosClient.post(uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Uploaded successfully", response.data);
        toast.success("Uploaded successfully");
        navigate(redirectUrl);
    } catch (error) {
      setError(true);
        console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, []);

  if(error) return <Error/>;

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--dark-pink)"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-(--ink) text-center">{title}</h1>
        <p className="text-(--ink) font-medium mt-2 text-center">{description}</p>
        
        <div className="mt-6 w-full max-w-md h-64 md:h-80 border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center bg-gray-50">
            <img src="/images/camera.avif" alt="Camera" className="w-16 h-16 opacity-70" />
            <button 
                onClick={toggleForm} 
                className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-bold py-2.5 px-6 rounded-lg mt-4 transition-colors"
            >
                Upload Photos
            </button>
        </div>
        
        {showForm && (
            <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
                <div className="relative bg-white p-6 md:p-8 rounded-2xl w-full max-w-xl h-auto max-h-[90vh] flex flex-col items-center shadow-xl">
                    <div className="absolute top-4 right-4">
                        <button onClick={toggleForm} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                            X
                        </button>
                    </div>
                    <div className="mb-4">
                        <p className="text-xl font-bold text-(--ink)">Upload Photos</p>
                    </div>
                    <div className="w-full py-12 border-2 border-dashed rounded-xl border-gray-300 flex flex-col items-center justify-center bg-gray-50">
                        <p className="text-(--ink) font-medium mb-4">Select your photo</p>
                        <button 
                            onClick={() => fileInputRef.current.click()} 
                            className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-medium px-5 py-2 rounded-lg transition-colors"
                        >
                            Browse
                        </button>
                        <input multiple={allowMultiple} type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImagePreview} />
                    </div>
                </div>
            </div>
        )}

        {selectedImages.length > 0 && (
            <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
                <div className="relative bg-white p-6 md:p-8 rounded-2xl w-full max-w-2xl h-auto max-h-[90vh] flex flex-col shadow-xl">
                    <div className="absolute top-4 right-4">
                        <button onClick={() => setSelectedImages([])} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                            X
                        </button>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-xl font-bold text-(--ink)">Preview Photos</p>
                    </div>

                    <div className="overflow-y-auto w-full border-2 rounded-xl border-gray-200 p-2 flex-grow">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="relative aspect-square border rounded-lg overflow-hidden bg-gray-50">
                                    <button 
                                        onClick={removeImage(index)} 
                                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center z-10 shadow-sm transition-colors"
                                    >
                                        <Trash size={12} />
                                    </button>
                                    <img src={image.preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t">
                        <button 
                            onClick={() => fileInputRef2.current.click()} 
                            className="bg-gray-100 hover:bg-gray-200 text-(--ink) font-medium px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto"
                        >
                            Browse
                        </button>
                        <input multiple={allowMultiple} type="file" accept="image/*" ref={fileInputRef2} className="hidden" onChange={handleImagePreview} />

                        <button 
                            onClick={() => handleUpload(formData, uploadUrl)} 
                            className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white font-bold px-8 py-2.5 rounded-lg transition-colors w-full sm:w-auto"
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default PhotoForm;
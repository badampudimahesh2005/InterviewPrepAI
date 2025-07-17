
import { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';


const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      //update the image state
      setImage(file);

      //generate preview UTL from the file
      const preview  = URL.createObjectURL(file);
      if(setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };


  const handleRemoveImage = () => {
    setImage('');
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-500" />

          <button
            type="button"
            onClick={onChooseFile}
            className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute bottom-1 -right-1 cursor-pointer'
          >
            <LuUpload />
          </button>
        </div>
      ):(
        <div className="relative">
          <img 
          src={preview || previewUrl} 
          alt="Profile photo" 
          className="w-20 h-20 object-cover rounded-full"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector;
import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className='flex justify-center mb-6'>
      <input
        type='file'
        name="image"  
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-slate-700/60 rounded-full relative cursor-pointer'>
          <LuUser className='text-4xl text-primary' />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center
            bg-primary text-white rounded-full
            absolute -bottom-1 -right-1 cursor-pointer
            hover:bg-violet-500'
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={previewUrl}
            alt='profile photo'
            className='w-20 h-20 rounded-full object-cover border-2 border-slate-700'
          />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center
            bg-rose-500 text-white rounded-full
            absolute -bottom-1 -right-1
            hover:bg-rose-400'
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;

"use client";

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from "next-cloudinary";

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { url: string }[]) => void
  onRemove: (url: string) => void
  value: { url: string }[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentImagesRef = useRef(value);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    currentImagesRef.current = value
  }, [value])

  const onUpload = (result: any) => {
    const newImage = { url: result?.info.secure_url };
    const updatedImages = [...currentImagesRef.current, newImage];

    currentImagesRef.current = updatedImages;

    onChange(updatedImages)
  }

  const handleRemove = (urlToRemove: string) => {
    const filteredImages = value.filter((image) => image.url !== urlToRemove)
    onChange(filteredImages)
    onRemove(urlToRemove)
  }

  if(!isMounted){
    return null;
  }

  return (
      <div>
        <div className='mb-4 flex items-center gap-4'>
          {value.map((image) => (
            <div key={image.url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden mb-2'>
              <div className='z-10 absolute top-2 right-2'>
                <Button type='button' onClick={() => handleRemove(image.url)} variant="destructive" size="icon" >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
              <Image
                fill
                className='object-cover'
                alt="Image"
                src={image.url}
              />
            </div>
          ))}
          </div>
          <CldUploadWidget 
            onSuccess={(result, { widget }) => {
              onUpload(result);
            }}
            uploadPreset='vsz5fjke'
          >
            {({ open }) => {
              const onClick = () => {
                open();
              }
              return (
                <Button
                  type='button'
                  disabled={disabled}
                  variant="secondary"
                  onClick={onClick}
                >
                  <ImagePlus className='h-4 w-4 mr-2' />
                  Upload an Image
                </Button>
              )
            }}
          </CldUploadWidget>
      </div>
    )
}

export default ImageUpload
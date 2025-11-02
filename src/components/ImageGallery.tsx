'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiZoomIn, FiX } from 'react-icons/fi'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <div className="space-y-4">
        {/* Main Image or Video */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
          {images[selectedImage].endsWith('.mp4') ? (
            <video
              src={images[selectedImage]}
              className="object-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={images[selectedImage]}
              alt={`${productName} - Image ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority
            />
          )}
          {!images[selectedImage].endsWith('.mp4') && (
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Zoom image"
            >
              <FiZoomIn className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-gold' : 'border-transparent hover:border-gray-300'
                }`}
              >
                {image.endsWith('.mp4') ? (
                  <video
                    src={image}
                    className="object-cover w-full h-full"
                    muted
                  />
                ) : (
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors"
            aria-label="Close zoom"
          >
            <FiX className="w-6 h-6" />
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Image
              src={images[selectedImage]}
              alt={`${productName} zoomed`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

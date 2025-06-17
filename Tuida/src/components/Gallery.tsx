import React from 'react'
interface GalleryImage {
  id: number
  url: string
  alt: string
}
interface GalleryProps {
  images: GalleryImage[]
}
const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="aspect-[4/3] overflow-hidden group cursor-pointer"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}
export default Gallery

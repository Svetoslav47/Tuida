import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface GalleryItem {
  id: number
  image: string
  title: string
  category: string
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: '/interactiveMap.jpg',
      title: 'Топ изглед',
      category: 'Комплекс',
    },
    {
      id: 2,
      image: '/housePageBanner.jpg', 
      title: 'Общи пространства',
      category: 'Екстериор',
    },
    {
      id: 3,
      image: '/type1-min.jpg',
      title: 'Къщи тип 1 и 2',
      category: 'Екстериор',
    },
    {
      id: 4,
      image: '/type2-min.jpg',
      title: 'Къща тип 4', 
      category: 'Екстериор',
    },
    {
      id: 5,
      image: '/k4.webp',
      title: 'Къща тип 4',
      category: 'Екстериор',
    },
    {
      id: 6,
      image: '/k2and2f.webp',
      title: 'Къща тип 2',
      category: 'Екстериор',
    },
    {
      id: 7,
      image: '/k3and3f.webp',
      title: 'Къща тип 3',
      category: 'Екстериор',
    },
  ]

  const handleImageClick = (item: GalleryItem) => {
    console.log('Opening modal for:', item.title)
    setSelectedImage(item)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    console.log('Closing modal')
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const ModalPortal = () => {
    if (!mounted || !selectedImage) return null

    return createPortal(
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={closeModal}
      >
        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '-50px',
              right: '0px',
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            ✕
          </button>
          
          {/* Image */}
          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div className="relative">
      <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-light mb-8">Галерия</h2>
            <p className="text-gray-600 max-w-2xl">
              Разгледайте нашата колекция реалистични рендери на къщите. Всяко изображение представлява нашия ангажимент да създаваме
              пространства, които балансират естетика, функционалност и устойчиви
              принципи на проектиране и строителство.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] cursor-pointer"
                style={{
                  animationDelay: `${item.id * 0.1}s`,
                }}
                onClick={() => handleImageClick(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-light">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render modal using portal */}
      <ModalPortal />
    </div>
  )
}
export default Gallery

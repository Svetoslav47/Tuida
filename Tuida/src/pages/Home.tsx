import React, { useState } from 'react'
import Gallery from '../components/Gallery'
import FloorPlan from '../components/FloorPlan'
const House: React.FC = () => {
  const [activeFloor, setActiveFloor] = useState(0)
  const floorPlans = [
    {
      id: 0,
      name: '1st Floor',
      image:
        'https://images.unsplash.com/photo-1632392720073-08c59b21c640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
    },
    {
      id: 1,
      name: '2nd Floor',
      image:
        'https://images.unsplash.com/photo-1632392720073-08c59b21c640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
    },
  ]
  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      alt: 'Living Room',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
      alt: 'Kitchen',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      alt: 'Master Bedroom',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35b6',
      alt: 'Bathroom',
    },
  ]
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full h-[70vh] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Modern House Exterior"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <h1 className="text-4xl font-light mb-6">Modern Villa</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <p className="text-gray-600 leading-relaxed">
              This stunning modern villa seamlessly blends contemporary
              architecture with natural elements. Featuring four bedrooms, three
              bathrooms, and expansive living areas, the home offers the perfect
              balance of luxury and comfort. Floor-to-ceiling windows throughout
              maximize natural light and provide breathtaking views of the
              surrounding landscape.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Size</h3>
              <p className="text-gray-600">3,500 sq ft</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Bedrooms</h3>
              <p className="text-gray-600">4</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Bathrooms</h3>
              <p className="text-gray-600">3</p>
            </div>
          </div>
        </div>
        <Gallery images={galleryImages} />
        <div className="mt-24">
          <h2 className="text-2xl font-light mb-8">Floor Plans</h2>
          <div className="flex space-x-4 mb-8">
            {floorPlans.map((floor) => (
              <button
                key={floor.id}
                onClick={() => setActiveFloor(floor.id)}
                className={`px-6 py-2 text-sm transition-colors ${activeFloor === floor.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {floor.name}
              </button>
            ))}
          </div>
          <FloorPlan image={floorPlans[activeFloor].image} />
        </div>
      </div>
    </div>
  )
}
export default House

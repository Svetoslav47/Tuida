import React, { useState, useEffect } from 'react'
import FloorPlan from '../components/FloorPlan'
import { FaCar, FaBed, FaExpand, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { usePopInOnScroll } from '../hooks/usePopInOnScroll'
import Contact from '../components/ContactForm'

interface House {
  id: number
  name: string
  house_area?: number
  full_area?: number
  price?: number | null
  state: string
  first_floor?: {
    short_description: string
    floor_plan: {
      image: string
      rooms: Array<{
        name: string
        area: number
      }>
    }
  }
  second_floor?: {
    short_description: string
    floor_plan: {
      image: string
      rooms: Array<{
        name: string
        area: number
      }>
    }
  }
  image: string
  number_of_parking_spaces: number
  number_of_bedrooms: number
  vertices: Array<{
    x: number
    y: number
  }>
}

const Home: React.FC = () => {
  const [activeFloor, setActiveFloor] = useState(0)
  const [houseData, setHouseData] = useState<House | null>(null)
  const [loading, setLoading] = useState(true)
  const [zoomOpen, setZoomOpen] = useState(false)

  const { ref, isVisible } = usePopInOnScroll()

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await fetch('/houses.json')
        const houses: House[] = await response.json()
        // Use the first house from the JSON
        setHouseData(houses[0])
      } catch (error) {
        console.error('Error fetching house data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHouseData()
  }, [])

  const floorPlans = houseData ? [
    {
      id: 0,
      name: 'Първи Етаж',
      image: houseData.first_floor?.floor_plan.image || '/floorPlan1Type1.webp',
    },
    {
      id: 1,
      name: 'Втори Етаж',
      image: houseData.second_floor?.floor_plan.image || '/floorPlan2Type1.webp',
    },
  ] : []

  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!houseData) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">House data not found</div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`w-full min-h-screen bg-white ${!loading && isVisible ? 'pop-in' : ''}`}
    >
      <div className="w-full h-[70vh] relative overflow-hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors hover:bg-black hover:bg-opacity-70 focus:bg-black focus:bg-opacity-70"
          aria-label="Back"
        >
          <FaArrowLeft className="text-lg" />
        </button>
        <img
          src={houseData.image || "/type1-min.jpg"}
          alt={`${houseData.name} Exterior`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-16 left-16 flex flex-col gap-6 text-white max-w-[90vw]">
          <span className="text-5xl font-bold tracking-wide mb-2" style={{fontFamily: 'inherit', textShadow: '4px 4px 16px rgba(0,0,0,0.95)'}}>{houseData.name}</span>
          <div className="flex gap-10 items-center text-lg">
            <div className="flex items-center gap-2" style={{textShadow: '4px 4px 16px rgba(0,0,0,0.95)'}}>
              <FaExpand className="text-4xl" />
              <span className="text-base font-medium">{houseData.house_area || houseData.full_area} м²</span>
            </div>
            <div className="flex items-center gap-2" style={{textShadow: '4px 4px 16px rgba(0,0,0,0.95)'}}>
              <FaCar className="text-4xl" />
              <span className="text-base font-medium">{houseData.number_of_parking_spaces} Паркоместа</span>
            </div>
            <div className="flex items-center gap-2" style={{textShadow: '4px 4px 16px rgba(0,0,0,0.95)'}}>
              <FaBed className="text-4xl" />
              <span className="text-base font-medium">{houseData.number_of_bedrooms} Спални</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="">
          <h2 className="text-3xl font-light mb-8">Разпределение</h2>
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
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-7/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Стаи и Площи</h3>
              <ul className="space-y-2">
                {(activeFloor === 0
                  ? houseData.first_floor?.floor_plan.rooms
                  : houseData.second_floor?.floor_plan.rooms
                )?.map((room, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-2 last:border-b-0">
                    <span className="text-gray-700">{room.name}</span>
                    <span className="text-gray-500">{room.area} м²</span>
                  </li>
                )) || <li className="text-gray-400">No rooms data available.</li>}
              </ul>
            </div>
            <div className="w-full md:w-3/10 md:pl-8 flex flex-col items-center h-full">
              <div className="cursor-zoom-in w-full h-full flex items-center" style={{height: '100%'}} onClick={() => setZoomOpen(true)}>
                <FloorPlan image={floorPlans[activeFloor].image} className="h-full border-0" />
              </div>
            </div>
          </div>
          {zoomOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setZoomOpen(false)}>
              <img
                src={floorPlans[activeFloor].image}
                alt="Zoomed Floor Plan"
                className="max-w-3xl max-h-[90vh] rounded shadow-lg border-4 border-white"
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}
        </div>
        <Contact />
      </div>
    </div>
  )
}
export default Home


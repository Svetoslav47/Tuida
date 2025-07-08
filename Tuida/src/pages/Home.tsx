import React, { useState, useEffect } from 'react'
import FloorPlan from '../components/FloorPlan'
import { FaCar, FaBed, FaExpand, FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { usePopInOnScroll } from '../hooks/usePopInOnScroll'
import ContactForm from '../components/ContactForm'

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
  const { houseName } = useParams<{ houseName: string }>()

  const { ref, isVisible } = usePopInOnScroll()

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await fetch('/houses.json')
        const houses: House[] = await response.json()
        
        // Convert houseName to number and find the specific house
        const houseId = parseInt(houseName || '1', 10)
        const foundHouse = houses.find(house => house.id === houseId)
        
        if (foundHouse) {
          setHouseData(foundHouse)
        } else {
          console.error(`House with ID ${houseId} not found`)
          // Fallback to first house if the requested house is not found
          setHouseData(houses[0])
        }
      } catch (error) {
        console.error('Error fetching house data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHouseData()
  }, [houseName])

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

  // Function to determine house type based on image name
  const getHouseType = (imageName: string): string => {
    if (imageName.includes('k1')) return 'Тип 1'
    if (imageName.includes('k2')) return 'Тип 2'
    if (imageName.includes('k3')) return 'Тип 3'
    if (imageName.includes('k4')) return 'Тип 4'
    return 'Неизвестен тип'
  }

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
      <div className="w-full h-[60vh] sm:h-[70vh] relative overflow-hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-colors hover:bg-black hover:bg-opacity-70 focus:bg-black focus:bg-opacity-70"
          aria-label="Back"
        >
          <FaArrowLeft className="text-lg" />
        </button>
        <img
          src={houseData.image || "/type1-min.jpg"}
          alt={`${houseData.name} Exterior`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 sm:bottom-16 sm:left-16 flex flex-col gap-3 sm:gap-6 text-white max-w-[calc(100vw-2rem)] sm:max-w-[90vw]">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-1 sm:mb-2 leading-tight" style={{fontFamily: 'inherit', textShadow: '2px 2px 8px rgba(0,0,0,0.95)'}}>
            {houseData.name} - {getHouseType(houseData.image)}
          </span>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 items-start sm:items-center text-sm sm:text-lg">
            <div className="flex items-center gap-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.95)'}}>
              <FaExpand className="text-xl sm:text-3xl flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-medium">РЗП: {houseData.house_area} м²</span>
                <span className="text-sm sm:text-base font-medium">Площ на имота: {houseData.full_area} м²</span>
              </div>
            </div>
            <div className="flex items-center gap-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.95)'}}>
              <FaCar className="text-xl sm:text-3xl flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium">{houseData.number_of_parking_spaces} Паркоместа</span>
            </div>
            <div className="flex items-center gap-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.95)'}}>
              <FaBed className="text-xl sm:text-3xl flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium">{houseData.number_of_bedrooms} Спални</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-16">
        <div className="mb-20 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8">Разпределение</h2>
          <div className="flex flex-wrap gap-2 sm:space-x-4 mb-6 sm:mb-8">
            {floorPlans.map((floor) => (
              <button
                key={floor.id}
                onClick={() => setActiveFloor(floor.id)}
                className={`px-4 sm:px-6 py-2 text-sm transition-colors ${activeFloor === floor.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {floor.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
            <div className="w-full lg:w-7/12 p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Стаи и РЗП</h3>
              <ul className="space-y-2">
                {(activeFloor === 0
                  ? houseData.first_floor?.floor_plan.rooms
                  : houseData.second_floor?.floor_plan.rooms
                )?.map((room, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-2 last:border-b-0">
                    <span className="text-gray-700 text-sm sm:text-base">{room.name}</span>
                    <span className="text-gray-500 text-sm sm:text-base font-medium">{room.area} м²</span>
                  </li>
                )) || <li className="text-gray-400">No rooms data available.</li>}
              </ul>
            </div>
            <div className="w-full lg:w-5/12 lg:pl-8 flex flex-col items-center">
              <div className="cursor-zoom-in w-full max-w-md lg:max-w-none flex items-center justify-center mb-4 sm:mb-0" onClick={() => setZoomOpen(true)}>
                <FloorPlan image={floorPlans[activeFloor].image} className="w-full h-auto border-0" />
              </div>
            </div>
          </div>
          {zoomOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" onClick={() => setZoomOpen(false)}>
              <img
                src={floorPlans[activeFloor].image}
                alt="Zoomed Floor Plan"
                className="max-w-full max-h-[90vh] rounded shadow-lg border-4 border-white"
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}
        </div>
        <div className="w-full block">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
export default Home


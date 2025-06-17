import React, { useState } from 'react'
interface House {
  id: number
  name: string
  coords: string
  position: {
    x: number
    y: number
  }
}
interface InteractiveMapProps {
  onHouseClick: (houseId: number) => void
}
const InteractiveMap: React.FC<InteractiveMapProps> = ({ onHouseClick }) => {
  const [activeHouse, setActiveHouse] = useState<number | null>(null)
  const houses: House[] = [
    {
      id: 1,
      name: 'Villa Aurora',
      coords: '150,180,250,280',
      position: {
        x: 25,
        y: 30, // percentage
      },
    },
    {
      id: 2,
      name: 'Sunset House',
      coords: '310,65,375,100',
      position: {
        x: 50,
        y: 25,
      },
    },
    {
      id: 3,
      name: 'Hillside Retreat',
      coords: '450,200,550,300',
      position: {
        x: 75,
        y: 33,
      },
    },
    {
      id: 4,
      name: 'Modern Haven',
      coords: '200,300,300,400',
      position: {
        x: 33,
        y: 50,
      },
    },
    {
      id: 5,
      name: 'Sky Villa',
      coords: '350,250,450,350',
      position: {
        x: 58,
        y: 42,
      },
    },
  ]
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-white/60 group-hover:bg-white/80 transition-all z-10 pointer-events-auto" />
      <div className="relative z-20">
        <img
          src="https://uploadthingy.s3.us-west-1.amazonaws.com/ampbyVZyum2oxZLERJgYwf/image.png"
          alt="ARCHOUSE Development Map"
          className="w-full h-auto"
        />
        {houses.map((house) => {
          const isActive = activeHouse === house.id;
          const [x1, y1, x2, y2] = house.coords.split(',').map(Number);
          const left = Math.min(x1, x2);
          const top = Math.min(y1, y2);
          const width = Math.abs(x2 - x1);
          const height = Math.abs(y2 - y1);
          return (
            <div
              key={house.id}
              className="absolute group cursor-pointer"
              style={{
                left: left,
                top: top,
                width: width,
                height: height,
              }}
              onMouseEnter={() => setActiveHouse(house.id)}
              onMouseLeave={() => setActiveHouse(null)}
              onClick={() => onHouseClick(house.id)}
            >
              <div
                className={`w-full h-full bg-white/40 group-hover:bg-white/70 transition-all border-2 ${isActive ? 'border-black' : 'border-transparent'}`}
              />
              {isActive && (
                <div
                  className="absolute z-10 bg-white/80 text-black px-3 py-1 text-sm pointer-events-auto shadow-lg transition-opacity duration-200 whitespace-nowrap"
                  style={{ left: '100%', top: '50%', opacity: 1, borderRadius: 0, transform: 'translateY(-50%)' }}
                  onMouseEnter={() => setActiveHouse(house.id)}
                  onMouseLeave={() => setActiveHouse(null)}
                  onClick={() => onHouseClick(house.id)}
                >
                  {house.name}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default InteractiveMap

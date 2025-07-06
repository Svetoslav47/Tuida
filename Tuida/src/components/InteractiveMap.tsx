import React, { useState, useEffect, useRef } from 'react'

interface Vertex {
  x: number
  y: number
}

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
  vertices: Vertex[]
}

interface InteractiveMapProps {
  onHouseClick: (houseId: number) => void
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onHouseClick }) => {
  const [activeHouse, setActiveHouse] = useState<number | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedVertex, setSelectedVertex] = useState<{ houseId: number; vertexIndex: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [debugHouses, setDebugHouses] = useState<House[]>([])
  const [originalHouses, setOriginalHouses] = useState<House[]>([])
  const [mobileViewStyle, setMobileViewStyle] = useState<'clean' | 'cards'>('clean')
  const imageRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  
  // SVG viewport dimensions
  const SVG_WIDTH = 800
  const SVG_HEIGHT = 450

  // Convert coordinates from image space to SVG space
  const convertCoordinates = (vertices: Vertex[], imgWidth: number, imgHeight: number): Vertex[] => {
    return vertices.map(vertex => ({
      x: (vertex.x / imgWidth) * SVG_WIDTH,
      y: (vertex.y / imgHeight) * SVG_HEIGHT
    }))
  }

  // Convert coordinates from SVG space back to image space
  const convertToImageCoordinates = (vertices: Vertex[], imgWidth: number, imgHeight: number): Vertex[] => {
    return vertices.map(vertex => ({
      x: Math.round((vertex.x / SVG_WIDTH) * imgWidth),
      y: Math.round((vertex.y / SVG_HEIGHT) * imgHeight)
    }))
  }

  // Get converted houses with SVG coordinates
  const getConvertedHouses = (): House[] => {
    if (!imageDimensions) return []
    
    const houses = originalHouses.map(house => ({
      ...house,
      vertices: convertCoordinates(house.vertices, imageDimensions.width, imageDimensions.height)
    }))
    
    return houses
  }

  // Initialize debugHouses when edit mode is enabled
  useEffect(() => {
    if (editMode && imageDimensions) {
      const houses = getConvertedHouses()
      setDebugHouses(houses)
    }
  }, [editMode, imageDimensions])

  // Load image and get dimensions
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
      console.log('Image dimensions:', img.naturalWidth, 'x', img.naturalHeight)
    }
    img.src = '/interactiveMap.jpg'
  }, [])

  // Load houses from JSON file
  useEffect(() => {
    fetch('/houses.json')
      .then(response => response.json())
      .then(data => {
        setOriginalHouses(data)
        console.log('Loaded houses from JSON:', data.length, 'houses')
      })
      .catch(error => {
        console.error('Error loading houses:', error)
        setOriginalHouses([])
      })
  }, [])

  // Get SVG point from mouse event
  const getSVGPoint = (event: React.MouseEvent | MouseEvent): { x: number; y: number } | null => {
    if (!svgRef.current) return null
    
    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = event.clientX
    pt.y = event.clientY
    
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    return { x: svgP.x, y: svgP.y }
  }

  // Handle vertex drag start
  const handleVertexMouseDown = (houseId: number, vertexIndex: number, event: React.MouseEvent) => {
    if (!editMode) return
    
    event.preventDefault()
    setSelectedVertex({ houseId, vertexIndex })
    setIsDragging(true)
  }

  // Handle mouse move for dragging
  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !selectedVertex || !imageDimensions) return
    
    const svgPoint = getSVGPoint(event)
    if (!svgPoint) return
    
    // Constrain to SVG bounds
    const x = Math.max(0, Math.min(SVG_WIDTH, svgPoint.x))
    const y = Math.max(0, Math.min(SVG_HEIGHT, svgPoint.y))
    
    setDebugHouses(prev => prev.map(house => {
      if (house.id === selectedVertex.houseId) {
        const newVertices = [...house.vertices]
        newVertices[selectedVertex.vertexIndex] = { x, y }
        return { ...house, vertices: newVertices }
      }
      return house
    }))
  }

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    if (isDragging && selectedVertex && imageDimensions) {
      // Convert back to image coordinates and log
      const imageCoords = debugHouses.map(house => ({
        ...house,
        vertices: convertToImageCoordinates(house.vertices, imageDimensions.width, imageDimensions.height)
      }))
      const updatedHouse = imageCoords.find(h => h.id === selectedVertex.houseId)
      
      if (updatedHouse) {
        console.log('Updated house coordinates:')
        console.log(JSON.stringify(updatedHouse, null, 2))
        console.log('Copy this JSON to update your house coordinates:')
        console.log(`{
  id: ${updatedHouse.id},
  name: '${updatedHouse.name}',
  vertices: [
${updatedHouse.vertices.map(v => `    { x: ${v.x}, y: ${v.y} }`).join(',\n')}
  ],
}`)
      }
    }
    
    setIsDragging(false)
    setSelectedVertex(null)
  }

  // Calculate distance from point to line segment
  const distanceToLineSegment = (point: Vertex, lineStart: Vertex, lineEnd: Vertex): number => {
    const A = point.x - lineStart.x
    const B = point.y - lineStart.y
    const C = lineEnd.x - lineStart.x
    const D = lineEnd.y - lineStart.y

    const dot = A * C + B * D
    const lenSq = C * C + D * D
    let param = -1

    if (lenSq !== 0) param = dot / lenSq

    let xx, yy

    if (param < 0) {
      xx = lineStart.x
      yy = lineStart.y
    } else if (param > 1) {
      xx = lineEnd.x
      yy = lineEnd.y
    } else {
      xx = lineStart.x + param * C
      yy = lineStart.y + param * D
    }

    const dx = point.x - xx
    const dy = point.y - yy
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Find the closest edge and its index for a given point
  const findClosestEdge = (point: Vertex, house: House): { edgeIndex: number; distance: number } | null => {
    let closestEdge = -1
    let minDistance = Infinity

    for (let i = 0; i < house.vertices.length; i++) {
      const start = house.vertices[i]
      const end = house.vertices[(i + 1) % house.vertices.length]
      const distance = distanceToLineSegment(point, start, end)
      
      if (distance < minDistance) {
        minDistance = distance
        closestEdge = i
      }
    }

    // Only return if the distance is within a reasonable threshold (e.g., 20 pixels)
    if (minDistance <= 20) {
      return { edgeIndex: closestEdge, distance: minDistance }
    }

    return null
  }

  // Calculate the closest point on a line segment
  const getClosestPointOnLine = (point: Vertex, lineStart: Vertex, lineEnd: Vertex): Vertex => {
    const A = point.x - lineStart.x
    const B = point.y - lineStart.y
    const C = lineEnd.x - lineStart.x
    const D = lineEnd.y - lineStart.y

    const dot = A * C + B * D
    const lenSq = C * C + D * D
    let param = -1

    if (lenSq !== 0) param = dot / lenSq

    if (param < 0) {
      return { x: lineStart.x, y: lineStart.y }
    } else if (param > 1) {
      return { x: lineEnd.x, y: lineEnd.y }
    } else {
      return {
        x: lineStart.x + param * C,
        y: lineStart.y + param * D
      }
    }
  }

  // Handle double click on polygon to add new vertex
  const handlePolygonDoubleClick = (houseId: number, event: React.MouseEvent) => {
    if (!editMode) return

    const svgPoint = getSVGPoint(event)
    if (!svgPoint) return

    const house = debugHouses.find(h => h.id === houseId)
    if (!house) return

    const closestEdge = findClosestEdge(svgPoint, house)
    if (!closestEdge) return

    // Get the vertices of the edge
    const startVertex = house.vertices[closestEdge.edgeIndex]
    const endVertex = house.vertices[(closestEdge.edgeIndex + 1) % house.vertices.length]

    // Calculate the closest point on the edge
    const newVertex = getClosestPointOnLine(svgPoint, startVertex, endVertex)

    // Insert the new vertex after the start vertex
    const newVertices = [...house.vertices]
    newVertices.splice(closestEdge.edgeIndex + 1, 0, newVertex)

    // Update the house with the new vertex
    setDebugHouses(prev => prev.map(h => 
      h.id === houseId 
        ? { ...h, vertices: newVertices }
        : h
    ))

    console.log(`Added new vertex at (${newVertex.x.toFixed(1)}, ${newVertex.y.toFixed(1)}) to house ${houseId}`)
  }

  // Handle double click on vertex to delete it
  const handleVertexDoubleClick = (houseId: number, vertexIndex: number, event: React.MouseEvent) => {
    if (!editMode) return
    
    event.preventDefault()
    event.stopPropagation()

    const house = debugHouses.find(h => h.id === houseId)
    if (!house || house.vertices.length <= 3) {
      console.log('Cannot delete vertex: polygon must have at least 3 vertices')
      return
    }

    // Remove the vertex
    const newVertices = [...house.vertices]
    newVertices.splice(vertexIndex, 1)

    // Update the house with the removed vertex
    setDebugHouses(prev => prev.map(h => 
      h.id === houseId 
        ? { ...h, vertices: newVertices }
        : h
    ))

    console.log(`Deleted vertex ${vertexIndex} from house ${houseId}`)
  }

  // Create a new house
  const handleCreateHouse = () => {
    if (!editMode) return

    // Find the next available ID
    const allHouseIds = [
      ...originalHouses.map(h => h.id), 
      ...debugHouses.map(h => h.id)
    ]
    const nextId = allHouseIds.length > 0 ? Math.max(...allHouseIds) + 1 : 1

    // Create a 200x200 square at a reasonable position in SVG coordinates
    // Position it in the center of the SVG viewport
    const centerX = SVG_WIDTH / 2 - 100
    const centerY = SVG_HEIGHT / 2 - 100
    
    const newHouse: House = {
      id: nextId,
      name: 'Vila',
      state: 'free',
      image: 'type1-min.jpg',
      number_of_parking_spaces: 2,
      number_of_bedrooms: 4,
      vertices: [
        { x: centerX, y: centerY },
        { x: centerX + 200, y: centerY },
        { x: centerX + 200, y: centerY + 200 },
        { x: centerX, y: centerY + 200 }
      ]
    }

    // Add the new house to debugHouses (already in SVG coordinates)
    setDebugHouses(prev => [...prev, newHouse])

    console.log(`Created new house: ${newHouse.name} with ID ${newHouse.id} at SVG coordinates (${centerX}, ${centerY})`)
  }

  // Add/remove event listeners
  useEffect(() => {
    if (editMode) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [editMode, isDragging, selectedVertex, debugHouses])

  // Helper function to convert vertices to SVG polygon points string
  const verticesToPoints = (vertices: Vertex[]): string => {
    return vertices.map(vertex => `${vertex.x},${vertex.y}`).join(' ')
  }

  const houses = editMode ? debugHouses : getConvertedHouses()

  // Check if we're in development mode
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true'

  // Helper function to get bounding box for positioning tooltip
  const getBoundingBox = (vertices: Vertex[]) => {
    const xs = vertices.map(v => v.x)
    const ys = vertices.map(v => v.y)
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
      centerX: (Math.min(...xs) + Math.max(...xs)) / 2,
      centerY: (Math.min(...ys) + Math.max(...ys)) / 2,
    }
  }

  // Function to determine house type based on image name
  const getHouseType = (imageName: string): string => {
    if (imageName.includes('k1')) return 'Тип 1'
    if (imageName.includes('k2')) return 'Тип 2'
    if (imageName.includes('k3')) return 'Тип 3'
    if (imageName.includes('k4')) return 'Тип 4'
    return 'Неизвестен тип'
  }

  // Get the active house data
  const activeHouseData = houses.find(house => house.id === activeHouse)

  // Clean mobile house list component
  const CleanMobileHouseList = () => (
    <div className="w-full my-8 sm:my-16">
      <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-12 text-center">Къщи в комплекса</h2>
      <div className="space-y-6">
        {houses.map((house) => (
          <div 
            key={house.id}
            className="border-t pt-4 sm:pt-6 cursor-pointer"
            onClick={() => onHouseClick(house.id)}
          >
            <div className="flex gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <img
                  src={`/${house.image}`}
                  alt={house.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-light text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">
                  {house.name} - {getHouseType(house.image)}
                </h3>
                <div className="space-y-1 text-sm sm:text-base text-gray-600">
                  <div className="flex justify-between">
                    <span>РЗП:</span>
                    <span className="font-light">{house.house_area} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Площ на парцела:</span>
                    <span className="font-light">{house.full_area} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Спални:</span>
                    <span className="font-light">{house.number_of_bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Паркоместа:</span>
                    <span className="font-light">{house.number_of_parking_spaces}</span>
                  </div>
                  {house.price && (
                    <div className="flex justify-between">
                      <span>Цена:</span>
                      <span className="font-light">{house.price.toLocaleString()} лв.</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Статус:</span>
                    <span className="font-light">
                      {house.state === 'free' ? 'Свободна' : 'Заета'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Card mobile house list component
  const CardMobileHouseList = () => (
    <div className="w-full my-8 sm:my-16">
      <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-12 text-center">Къщи в комплекса</h2>
      <div className="grid gap-4">
        {houses.map((house) => (
          <div 
            key={house.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onHouseClick(house.id)}
          >
            <div className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={`/${house.image}`}
                  alt={house.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  {house.name} - {getHouseType(house.image)}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>РЗП:</span>
                    <span className="font-medium">{house.house_area} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Парцела:</span>
                    <span className="font-medium">{house.full_area} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Спални:</span>
                    <span className="font-medium">{house.number_of_bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Паркоместа:</span>
                    <span className="font-medium">{house.number_of_parking_spaces}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    house.state === 'free' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {house.state === 'free' ? 'Свободна' : 'Заета'}
                  </span>
                  {house.price && (
                    <span className="text-sm font-bold text-gray-900">
                      {house.price.toLocaleString()} лв.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="relative w-full">
      {/* Mobile view - house list */}
      <div className="block sm:hidden">
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMobileViewStyle('clean')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mobileViewStyle === 'clean'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Минимален
            </button>
            <button
              onClick={() => setMobileViewStyle('cards')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mobileViewStyle === 'cards'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Карти
            </button>
          </div>
        </div>
        {mobileViewStyle === 'clean' ? <CleanMobileHouseList /> : <CardMobileHouseList />}
      </div>
      
      {/* Desktop view - interactive map */}
      <div className="hidden sm:block">
        {/* Debug controls - moved above the map */}
        {isDevMode && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            {showDebug ? 'Hide Debug' : 'Show Debug'}
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-3 py-1 rounded text-sm ${editMode ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {editMode ? 'Exit Edit' : 'Edit Mode'}
          </button>
          {editMode && (
            <button
              onClick={() => {
                if (imageDimensions) {
                  const imageCoords = debugHouses.map(house => ({
                    ...house,
                    vertices: convertToImageCoordinates(house.vertices, imageDimensions.width, imageDimensions.height)
                  }))
                  console.log('All houses in image coordinates:')
                  console.log(JSON.stringify(imageCoords, null, 2))
                  
                  // Write to JSON file
                  const jsonData = JSON.stringify(imageCoords, null, 2)
                  const blob = new Blob([jsonData], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'houses.json'
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                  URL.revokeObjectURL(url)
                  
                  console.log('Houses exported to houses.json file')
                }
              }}
              className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
            >
              Export All
            </button>
          )}
          {editMode && (
            <button
              onClick={handleCreateHouse}
              className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
            >
              Create House
            </button>
          )}
        </div>
      )}

      <div className="relative">
        {/* Remove the transparent overlay */}
        
        {/* Debug info */}
        {showDebug && imageDimensions && (
          <div className="absolute top-2 right-2 z-30 bg-black/80 text-white p-3 rounded text-xs max-w-xs max-h-96 overflow-y-auto">
            <div>Image: {imageDimensions.width} x {imageDimensions.height}</div>
            <div>SVG: {SVG_WIDTH} x {SVG_HEIGHT}</div>
            <div>Scale X: {(SVG_WIDTH / imageDimensions.width).toFixed(4)}</div>
            <div>Scale Y: {(SVG_HEIGHT / imageDimensions.height).toFixed(4)}</div>
            <div className="mt-2">
              {houses.map(house => (
                <div key={house.id} className="mb-1">
                  <div className="font-bold">{house.name}:</div>
                  {house.vertices.map((vertex, i) => (
                    <div key={i} className="ml-2">
                      Point {i}: ({vertex.x.toFixed(1)}, {vertex.y.toFixed(1)})
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rich hover tooltip */}
        {activeHouseData && !editMode && (
          <div 
            className="absolute z-40 bg-white rounded-lg shadow-xl border border-gray-200 p-3 sm:p-4 max-w-[280px] sm:max-w-sm"
            style={{
              left: (() => {
                const bbox = getBoundingBox(activeHouseData.vertices)
                const houseRightEdge = (bbox.maxX / SVG_WIDTH) * 100
                const tooltipWidth = window.innerWidth < 640 ? 25 : 20 // Larger tooltip width on mobile
                
                // If house is near the right edge, position tooltip to the left
                if (houseRightEdge > 70) {
                  return `${(bbox.minX / SVG_WIDTH) * 100 - tooltipWidth - 2}%`
                }
                // Otherwise position to the right
                return `${houseRightEdge + 2}%`
              })(),
              top: (() => {
                const bbox = getBoundingBox(activeHouseData.vertices)
                const houseCenterY = (bbox.centerY / SVG_HEIGHT) * 100
                const tooltipHeight = window.innerWidth < 640 ? 20 : 15 // Larger tooltip height on mobile
                
                // If house is near the bottom, position tooltip above
                if (houseCenterY > 70) {
                  return `${houseCenterY - tooltipHeight - 5}%`
                }
                // If house is near the top, position tooltip below
                else if (houseCenterY < 30) {
                  return `${houseCenterY + 5}%`
                }
                // Otherwise center vertically
                else {
                  return `${houseCenterY - tooltipHeight / 2}%`
                }
              })(),
              transform: 'none'
            }}
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="w-full sm:w-32 h-24 sm:h-32 flex-shrink-0">
                <img
                  src={`/${activeHouseData.image}`}
                  alt={activeHouseData.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">
                  {activeHouseData.name} - {getHouseType(activeHouseData.image)}
                </h3>
                <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>РЗП:</span>
                    <span className="font-medium">{activeHouseData.house_area} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Площ на парцела:</span>
                    <span className="font-medium">{activeHouseData.full_area} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Спални:</span>
                    <span className="font-medium">{activeHouseData.number_of_bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Паркоместа:</span>
                    <span className="font-medium">{activeHouseData.number_of_parking_spaces}</span>
                  </div>
                  {activeHouseData.price && (
                    <div className="flex justify-between">
                      <span>Цена:</span>
                      <span className="font-medium">{activeHouseData.price.toLocaleString()} лв.</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Статус: </span>
                    <span className={`font-medium ml-1`}>
                      {activeHouseData.state === 'free' ? 'Свободна' : 'Заета'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-20">
          <img
            ref={imageRef}
            src="/interactiveMap.jpg"
            alt="ТУИДА ХОУМС Development Map"
            className="w-full h-auto"
          />
          {imageDimensions && (
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ top: 0, left: 0 }}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
           
              onMouseLeave={() => {
                if (!editMode) {
                  setActiveHouse(null)
                }
              }}
            >
              {/* Debug grid */}
              {showDebug && (
                <g>
                  {/* Vertical lines every 100 units */}
                  {Array.from({ length: Math.floor(SVG_WIDTH / 100) + 1 }, (_, i) => (
                    <line
                      key={`v${i}`}
                      x1={i * 100}
                      y1={0}
                      x2={i * 100}
                      y2={SVG_HEIGHT}
                      stroke="rgba(255, 0, 0, 0.3)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Horizontal lines every 100 units */}
                  {Array.from({ length: Math.floor(SVG_HEIGHT / 100) + 1 }, (_, i) => (
                    <line
                      key={`h${i}`}
                      x1={0}
                      y1={i * 100}
                      x2={SVG_WIDTH}
                      y2={i * 100}
                      stroke="rgba(255, 0, 0, 0.3)"
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}

              {houses.map((house) => {
                const isActive = activeHouse === house.id
                const points = verticesToPoints(house.vertices)
                const bbox = getBoundingBox(house.vertices)
                
                return (
                  <g key={house.id}>
                    <polygon
                      points={points}
                      className="cursor-pointer pointer-events-auto"
                      fill={isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)'}
                      stroke={editMode ? 'blue' : (isActive ? 'black' : 'transparent')}
                      strokeWidth={editMode ? "3" : "2"}
                      onMouseEnter={() => {
                        if (!editMode) setActiveHouse(house.id)
                      }}
                      onMouseLeave={() => {
                        if (!editMode) setActiveHouse(null)
                      }}
                      onClick={() => !editMode && onHouseClick(house.id)}
                      onDoubleClick={(e) => handlePolygonDoubleClick(house.id, e)}
                    />
                    
                    {/* Debug: Show vertex points */}
                    {(showDebug || editMode) && house.vertices.map((vertex, i) => (
                      <g key={i}>
                        <circle
                          cx={vertex.x}
                          cy={vertex.y}
                          r={editMode ? "6" : "3"}
                          fill={editMode ? "yellow" : "red"}
                          stroke="white"
                          strokeWidth="2"
                          className={editMode ? "cursor-move pointer-events-auto" : ""}
                          onMouseDown={(e) => handleVertexMouseDown(house.id, i, e)}
                          onDoubleClick={(e) => handleVertexDoubleClick(house.id, i, e)}
                          style={editMode ? { cursor: 'move' } : {}}
                        />
                        {editMode && (
                          <text
                            x={vertex.x + 10}
                            y={vertex.y - 10}
                            fill="white"
                            fontSize="10"
                            className="pointer-events-none"
                          >
                            {i}
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Show house ID in the middle in edit mode */}
                    {editMode && (
                      <text
                        x={bbox.centerX}
                        y={bbox.centerY}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize="24"
                        fontWeight="bold"
                        fill="black"
                        stroke="white"
                        strokeWidth="3"
                        paintOrder="stroke"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {house.id}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default InteractiveMap

import React from 'react'
const Gallery: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      image: '/houseOutsideView1.jpg',
      title: 'House Exterior View 1',
      category: 'Exterior',
    },
    {
      id: 2,
      image: '/houseOutsideView2.jpg',
      title: 'House Exterior View 2',
      category: 'Exterior',
    },
    {
      id: 3,
      image: '/type1.jpg',
      title: 'Type 1 House Design',
      category: 'Exterior',
    },
    {
      id: 4,
      image: '/type2.jpg',
      title: 'Type 2 House Design',
      category: 'Exterior',
    },
    {
      id: 5,
      image: '/type1-min.jpg',
      title: 'Type 1 Interior',
      category: 'Interior',
    },
    {
      id: 6,
      image: '/type2-min.jpg',
      title: 'Type 2 Interior',
      category: 'Interior',
    },
    {
      id: 7,
      image: '/interactiveMap.jpg',
      title: 'Topdown view',
      category: 'Commercial',
    },
  ]

  return (
    <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-8">Галерия</h2>
          <p className="text-gray-600 max-w-2xl">
            Разгледайте нашата колекция от архитектурни проекти и завършени
            сгради. Всяко изображение представлява нашия ангажимент да създаваме
            пространства, които балансират естетика, функционалност и устойчиви
            принципи на проектиране.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
              style={{
                animationDelay: `${item.id * 0.1}s`,
              }}
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
  )
}
export default Gallery

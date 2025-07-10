import React from 'react'
import {
    UmbrellaIcon,
  ShieldCheckIcon,
  KeyIcon,
  LightbulbIcon,
  BuildingIcon,
  Car,
} from 'lucide-react'
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}
const FeatureHighlights: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <UmbrellaIcon size={24} />,
      title: 'Минути от плажа',
      description:
        'Разположен само на 500м от плажа Галата, предлага лесен достъп до морския отдих.',
    },
    {
      icon: <ShieldCheckIcon size={24} />,
      title: '24/7 Видеонаблюдение',
      description:
        'Цялостно видеонаблюдение на територията на комплекса.',
    },
    {
      icon: <KeyIcon size={24} />,
      title: 'Контрол на достъпа',
      description:
        'Контролиран достъп за превозни средства и пешеходци, осигуряващ поверителност и безопасност.',
    },
    {
      icon: <LightbulbIcon size={24} />,
      title: 'Енергийно ефективни',
      description:
        'Енергийно ефективно строителство и решения за намаляване на въздействието върху околната среда и разходите.',
    },
    {
      icon: <BuildingIcon size={24} />,
      title: 'Премиум строителство',
      description:
        'Високотехнологично строителство, изпълнено с първокласни материали за трайно качество.',
    },
    {
      icon: <Car size={24} />,
      title: 'Паркоместа',
      description:
        'Всяка къща разполага с две паркоместа',
    },
  ]
  return (
    <div className="w-full my-24">
      <h2 className="text-2xl font-light mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
        Изключителни характеристики
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
            style={{
              animationDelay: `${index * 0.1 + 0.2}s`,
            }}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 text-gray-800">{feature.icon}</div>
              <h3 className="text-lg font-light">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-10">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default FeatureHighlights

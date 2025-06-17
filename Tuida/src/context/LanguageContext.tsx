import React, { useState, createContext, useContext } from 'react'
type Language = 'EN' | 'BG'
interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
}
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)
export const LanguageProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN')
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'BG' : 'EN'))
  }
  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

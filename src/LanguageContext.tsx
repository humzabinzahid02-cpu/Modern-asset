import { createContext, useContext } from 'react'

export const LanguageContext = createContext({ isArabic: false, toggleLanguage: () => {} })
export const useLanguage = () => useContext(LanguageContext)

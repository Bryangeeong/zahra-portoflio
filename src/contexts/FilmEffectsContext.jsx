import { createContext, useContext, useState } from 'react'

const FilmEffectsContext = createContext()

export const useFilmEffects = () => {
  const context = useContext(FilmEffectsContext)
  if (!context) {
    throw new Error('useFilmEffects must be used within a FilmEffectsProvider')
  }
  return context
}

export const FilmEffectsProvider = ({ children }) => {
  const [filmEffectsEnabled, setFilmEffectsEnabled] = useState(true)

  const toggleFilmEffects = () => {
    setFilmEffectsEnabled(prev => !prev)
  }

  return (
    <FilmEffectsContext.Provider value={{ 
      filmEffectsEnabled, 
      toggleFilmEffects 
    }}>
      {children}
    </FilmEffectsContext.Provider>
  )
}
import { createContext, useState } from 'react'

export const FilmEffectsContext = createContext()

export const FilmEffectsProvider = ({ children }) => {
  const [filmEffectsEnabled, setFilmEffectsEnabled] = useState(false)

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
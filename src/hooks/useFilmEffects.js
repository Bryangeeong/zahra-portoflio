import { useContext } from 'react'
import { FilmEffectsContext } from '../contexts/FilmEffectsContext'

export const useFilmEffects = () => {
  const context = useContext(FilmEffectsContext)
  if (!context) {
    throw new Error('useFilmEffects must be used within a FilmEffectsProvider')
  }
  return context
}
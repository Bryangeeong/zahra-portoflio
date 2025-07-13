import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { FilmEffectsProvider } from './contexts/FilmEffectsContext'
import { useFilmEffects } from './hooks/useFilmEffects'
import Header from './components/Header'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function HomePage() {
  return (
    <>
      <main className="main-content">
        <About />
        <Gallery />
        <Contact />
      </main>
      <footer className="footer">
        <p className="footer-text">
          Made with love ❤️ by{" "}
          <a 
            href="https://www.linkedin.com/in/bryangeeong/"
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Bryan Ong
          </a>
        </p>
      </footer>
    </>
  )
}

function AppContent() {
  const { filmEffectsEnabled } = useFilmEffects()
  
  return (
    <Router>
      <div className={`app ${filmEffectsEnabled ? 'film-effects-enabled' : ''}`} id="top">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <ScrollToTop />
        {filmEffectsEnabled && (
          <>
            <div className="film-grain"></div>
            <div className="film-dust"></div>
            <div className="film-scratches">
              <div className="scratch-1"></div>
              <div className="scratch-2"></div>
              <div className="scratch-3"></div>
              <div className="scratch-4"></div>
              <div className="scratch-5"></div>
              <div className="scratch-6"></div>
            </div>
            <div className="film-flicker"></div>
          </>
        )}
      </div>
    </Router>
  )
}

function App() {
  return (
    <FilmEffectsProvider>
      <AppContent />
    </FilmEffectsProvider>
  )
}

export default App

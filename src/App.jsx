import { HashRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Router>
      <div className="app" id="top">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App

import Header from './components/Header'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
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
    </div>
  )
}

export default App

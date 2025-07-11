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
    </div>
  )
}

export default App

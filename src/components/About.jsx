import { useState, useEffect } from 'react'
import './About.css'

function About() {
  const [currentText, setCurrentText] = useState(0)
  const texts = ['Artistic Director', 'Producer', 'Zahra Ghoncheh']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        const next = prev + 1
        if (next >= texts.length) {
          clearInterval(interval)
          return texts.length - 1 // Stay on "Zahra Ghoncheh"
        }
        return next
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="about">
      <div className="video-background">
        <video 
          className="background-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://res.cloudinary.com/dvalrc5nr/video/upload/w_1920,h_1080,c_fill,q_auto,f_auto/5727833-uhd_3840_2160_30fps_nvypin.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">
            <span className="rotating-text">
              {texts[currentText]}
            </span>
          </h2>
          <p className="about-description">
            Hello! I'm an NYC-based Artistic Director and Producer with over 3 years of industry experience. I look forward to working with you on your next project.
          </p>
        </div>
        <div className="about-image">
          <img 
            src="https://res.cloudinary.com/dvalrc5nr/image/upload/v1752208624/headshot_raidid.jpg" 
            alt="Zahra - Photographer" 
            className="photographer-image"
          />
        </div>
      </div>
    </section>
  )
}

export default About
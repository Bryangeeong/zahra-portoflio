import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="video-background">
        <div className="video-overlay"></div>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">About Zahra</h2>
          <p className="about-description">
            Welcome to my world of photography. I'm Zahra, a passionate photographer 
            who believes in capturing the essence of life through my lens. With over 
            5 years of experience, I specialize in portrait, landscape, and street 
            photography.
          </p>
          <p className="about-description">
            My journey began with a simple curiosity about how light and shadow 
            could tell stories. Today, I work with clients to create timeless 
            images that preserve precious moments and emotions.
          </p>
          <p className="about-description">
            When I'm not behind the camera, you'll find me exploring new locations, 
            studying the work of master photographers, or experimenting with new 
            techniques to bring fresh perspectives to my craft.
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
import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Ready to capture your special moments? Let's discuss your photography needs.
        </p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3 className="contact-label">Email</h3>
            <a href="mailto:hello@zahraphotography.com" className="contact-link">
              hello@zahraphotography.com
            </a>
          </div>
          
          <div className="contact-item">
            <h3 className="contact-label">Phone</h3>
            <a href="tel:+1234567890" className="contact-link">
              +1 (234) 567-890
            </a>
          </div>
          
          <div className="contact-item">
            <h3 className="contact-label">Location</h3>
            <p className="contact-text">
              Available for shoots worldwide
            </p>
          </div>
        </div>

        <div className="contact-form">
          <h3 className="form-title">Send a Message</h3>
          <form className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                className="form-textarea"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="form-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
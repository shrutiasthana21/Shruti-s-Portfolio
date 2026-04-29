import { useState } from 'react'
import axios from 'axios'
import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'
import './Contact.css'

const INITIAL = { firstName: '', lastName: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  useReveal('contact')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <section className="page" id="page-contact">
      <div className="section-wrap">
        <div className="section-label reveal">Contact</div>
        <h2 className="section-title">
          Let's build<br />something <em>remarkable.</em>
        </h2>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Have a project in mind?</h3>
            <p>
              I'm open to select freelance engagements and full-time opportunities.
              Whether it's a product redesign, a greenfield build, or simply a
              conversation — I'd love to hear from you.
            </p>

            <div className="contact-detail">
              <div className="contact-detail-icon">📧</div>
              <div className="contact-detail-text">
                <strong>Email</strong>
                asthanashruti7@gmail.com
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">📍</div>
              <div className="contact-detail-text">
                <strong>Location</strong>
                Lucknow 
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">⏰</div>
              <div className="contact-detail-text">
                <strong>Response Time</strong>
                Within 24 hours
              </div>
            </div>
          </div>

          <div className="reveal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text" name="firstName" className="form-input"
                    placeholder="" required
                    value={form.firstName} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text" name="lastName" className="form-input"
                    placeholder=""
                    value={form.lastName} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email" name="email" className="form-input"
                  placeholder="abc@company.com" required
                  value={form.email} onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text" name="subject" className="form-input"
                  placeholder="Project inquiry, collaboration, say hello..."
                  value={form.subject} onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message" className="form-textarea"
                  placeholder="Tell me about your project, timeline, and goals..."
                  required value={form.message} onChange={handleChange}
                />
              </div>

              {status !== 'success' && (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                  {status !== 'loading' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9z"/>
                    </svg>
                  )}
                </button>
              )}

              {status === 'success' && (
                <div className="form-success">
                  ✦ Thank you! Your message is on its way. I'll respond within 24 hours.
                </div>
              )}

              {status === 'error' && (
                <div className="form-error">{errorMsg}</div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}

import { useNavigation } from '../hooks/useNavigation'
import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'
import './About.css'

const SKILLS = [
  'React / Next.js', 'TypeScript', 'Node.js', 'Figma', 
     'PostgreSQL', 'AWS / Cloud',  'Framer Motion',
  'Python', 'Tailwind CSS', 'MERN'
]

export default function About() {
  const { navigate } = useNavigation()
  useReveal('about')

  return (
    <section className="page" id="page-about">
      <div className="section-wrap">
        <div className="section-label">About Me</div>
        <h2 className="section-title">
          Crafting digital <em>narratives</em><br />with purpose.
        </h2>

        <div className="about-grid">
          {/* Avatar */}
          <div className="about-avatar-wrap reveal">
            <div className="about-avatar">
              <div className="avatar-initials">SA</div>
            </div>
            <div className="about-deco1"></div>
            <div className="about-deco2"></div>
          </div>

          {/* Bio */}
          <div className="about-bio">
            <div className="section-label reveal" style={{ marginTop: '10px' }}>The Story</div>
            <p className="reveal">
             I'm pursuing my undergraduate degree in Computer Applications and work as a full-stack developer with solid expertise in the MERN stack and Python. I'm motivated by the conviction that meaningful software emerges when well-structured code meets carefully designed user interfaces.
            </p>
            <p className="reveal">
              My experience in academic projects and industry training has enabled me to build applications that can scale effectively, while maintaining excellent performance standards and enhancing my abilities in problem-solving and analytical reasoning. Additionally, I have participated in prestigious national competitions such as SIH hackathons, which emphasize teamwork and creative solutions.
            </p>
            <p className="reveal">
              Outside of work: Exploring new technologies beyond work requirements, Enhancing coding skills and methodologies, Building useful applications with real-world impact, Pursuing continuous personal growth through technical challenges
            </p>

            <div className="about-stats reveal">
              
              <div className="stat-card">
                <div className="stat-num">2+</div>
                <div className="stat-label">Hands-on Project</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">2+</div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>

            <button className="btn btn-primary reveal" onClick={() => navigate('contact')}>
              Let's Collaborate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="skills-section">
          <div className="section-label reveal">Technical Skills</div>
          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <div
                key={skill}
                className="skill-pill reveal"
                style={{ transitionDelay: `${i * 28}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}

import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'
import './Achievements.css'

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    year: '2025',
    title: 'Summer Traniee- Full Stack Development',
    desc: 'Awarded an S Grade (80%+) for excellent performance and technical proficiency',
    highlight: true,
  },
  
  
  {
    icon: '🎓',
    year: '2026',
    title: 'Smart India Hackathon (SIH) ',
    desc: "Actively participated and collaborated with a team to brainstorm and develop innovative tech solutions",
  },
  
]

export default function Achievements() {
  useReveal('achievements')

  return (
    <section className="page" id="page-achievements">
      <div className="section-wrap">
        <div className="section-label reveal">Recognition</div>
        <h2 className="section-title">
          Milestones that<br /><em>mark the journey.</em>
        </h2>

        <div className="achievements-layout">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className={`achievement-card reveal ${a.highlight ? 'highlight' : ''}`}>
              <div className="achievement-icon">{a.icon}</div>
              <div className="achievement-year">{a.year}</div>
              <h3 className="achievement-title">{a.title}</h3>
              <p className="achievement-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  )
}

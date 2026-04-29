import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'
import './Projects.css'

const PROJECTS = [
  {
    id: '01',
    featured: true,
    icon: '🌐',
    title: 'CMS Admin- Client Management System',
    desc: 'An expandable end-to-end Content Management System (CMS) developed with the MERN Stack technology, allowing users to create, organize, and distribute digital content effectively using a protected and user-friendly platform.',
    stack: ['MongoDB', 'ExpressJs', 'React', 'Figma', 'Node.js'],
    links: [
      { label: 'Live Site', arrow: 'external' },
      { label: 'Case Study', arrow: 'right' },
    ],
  },
  {
    id: '02',
    icon: '📊',
    title: 'Stock Management System',
    desc: 'A comprehensive full-stack inventory management platform designed to monitor, control, and coordinate stock activities in real-time. This platform assists companies in overseeing inventory quantities, minimizing human mistakes, and optimizing warehouse processes.',
    stack: ['React', 'JavaScript', 'CSS/Bootstrap', 'Node.js','Expres.js','MongoDB'],
    links: [
      { label: 'Live Demo', arrow: 'external' },
      { label: 'GitHub', arrow: 'right' },
    ],
  },

]

function ExternalIcon() {
  return (
    <svg width="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function RightArrow() {
  return (
    <svg width="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function ProjectCard({ project }) {
  return (
    <div className={`project-card reveal ${project.featured ? 'featured' : ''}`}>
      <div className="project-thumb">
        <div className="project-thumb-icon">{project.icon}</div>
        <div className="thumb-deco"></div>
      </div>
      <div className="project-body">
        <div className="project-num">
          {project.id}{project.featured ? ' — Featured' : ''}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="tech-stack">
          {project.stack.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.label} className="project-link" href="#">
              {link.label}{' '}
              {link.arrow === 'external' ? <ExternalIcon /> : <RightArrow />}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  useReveal('projects')

  return (
    <section className="page" id="page-projects">
      <div className="section-wrap">
        <div className="section-label reveal">Selected Work</div>
        <h2 className="section-title">
          Projects that <em>define</em><br />the craft.
        </h2>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <Footer />
    </section>
  )
}

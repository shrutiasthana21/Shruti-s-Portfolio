import { useState } from 'react'
import { useNavigation } from '../hooks/useNavigation'
import './Navbar.css'

const NAV_ITEMS = ['home', 'about', 'projects', 'achievements', 'contact']

export default function Navbar() {
  const { currentPage, navigate, navigateBack, canGoBack } = useNavigation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (page) => {
    navigate(page)
    setMobileOpen(false)
  }

  return (
    <>
      <nav id="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {canGoBack && (
            <button id="back-btn" onClick={navigateBack} className="visible" aria-label="Go back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
          )}
          <div className="nav-logo" onClick={() => handleNav('home')}>
            A<span>.</span>
          </div>
        </div>

        <ul className="nav-links">
          {NAV_ITEMS.map((page) => (
            <li key={page}>
              <a
                onClick={() => handleNav(page)}
                className={currentPage === page ? 'active' : ''}
                data-page={page}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((page) => (
          <a key={page} onClick={() => handleNav(page)}>
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </a>
        ))}
      </div>
    </>
  )
}

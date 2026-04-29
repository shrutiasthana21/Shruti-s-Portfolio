import { NavigationProvider, useNavigation } from './hooks/useNavigation'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Contact from './pages/Contact'

import './components/Navbar.css'

const PAGES = {
  home:         <Home />,
  about:        <About />,
  projects:     <Projects />,
  achievements: <Achievements />,
  contact:      <Contact />,
}

function AppContent() {
  const { currentPage } = useNavigation()
  return (
    <>
      <Cursor />
      <PageTransition />
      <Navbar />
      {PAGES[currentPage]}
    </>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}

import { createContext, useContext, useState, useCallback, useRef } from 'react'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home')
  const [transitioning, setTransitioning] = useState(false) // 'entering' | 'exiting' | false
  const historyRef = useRef([])

  const navigate = useCallback((page) => {
    if (page === currentPage || transitioning) return
    historyRef.current.push(currentPage)
    setTransitioning('entering')
    setTimeout(() => {
      setCurrentPage(page)
      window.scrollTo(0, 0)
      setTransitioning('exiting')
      setTimeout(() => setTransitioning(false), 500)
    }, 450)
  }, [currentPage, transitioning])

  const navigateBack = useCallback(() => {
    if (historyRef.current.length === 0 || transitioning) return
    const prev = historyRef.current.pop()
    setTransitioning('entering')
    setTimeout(() => {
      setCurrentPage(prev)
      window.scrollTo(0, 0)
      setTransitioning('exiting')
      setTimeout(() => setTransitioning(false), 500)
    }, 450)
  }, [transitioning])

  return (
    <NavigationContext.Provider value={{
      currentPage,
      navigate,
      navigateBack,
      canGoBack: historyRef.current.length > 0,
      transitioning
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  return useContext(NavigationContext)
}

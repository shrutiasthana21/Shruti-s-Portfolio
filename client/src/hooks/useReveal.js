import { useEffect } from 'react'
import { useNavigation } from './useNavigation'

export function useReveal(currentPage) {
  const { currentPage: activePage } = useNavigation()

  useEffect(() => {
    if (activePage !== currentPage) return

    const els = document.querySelectorAll(`#page-${currentPage} .reveal`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 55)
          }
        })
      },
      { threshold: 0.1 }
    )

    els.forEach((el) => {
      el.classList.remove('visible')
      observer.observe(el)
    })

    // Instantly reveal elements already in viewport
    setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9) el.classList.add('visible')
      })
    }, 80)

    return () => observer.disconnect()
  }, [activePage, currentPage])
}

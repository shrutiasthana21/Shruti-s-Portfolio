import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.13
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.13
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top  = ringPos.current.y + 'px'
      rafRef.current = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Bind hover effects via delegation
  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current

    const expand = () => {
      cursor.style.width = '6px'
      cursor.style.height = '6px'
      cursor.style.background = 'var(--light-accent)'
      ring.style.width = '50px'
      ring.style.height = '50px'
      ring.style.opacity = '0.3'
    }
    const collapse = () => {
      cursor.style.width = '10px'
      cursor.style.height = '10px'
      cursor.style.background = 'var(--primary)'
      ring.style.width = '34px'
      ring.style.height = '34px'
      ring.style.opacity = '1'
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, .project-card, .achievement-card, .stat-card, .skill-pill')) {
        expand()
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, .project-card, .achievement-card, .stat-card, .skill-pill')) {
        collapse()
      }
    }

    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

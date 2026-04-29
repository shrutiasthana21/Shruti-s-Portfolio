import { useNavigation } from '../hooks/useNavigation'

export default function PageTransition() {
  const { transitioning } = useNavigation()
  return (
    <div
      className={`page-transition ${transitioning || ''}`}
      id="transition"
    />
  )
}

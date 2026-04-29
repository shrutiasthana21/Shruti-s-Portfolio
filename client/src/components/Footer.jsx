import { useNavigation } from '../hooks/useNavigation'

export default function Footer() {
  const { navigate } = useNavigation()
  return (
    <footer>
      <p>
        Crafted with intention ·{' '}
        <a onClick={() => navigate('home')}>Shruti Asthana</a> · 2026
      </p>
    </footer>
  )
}

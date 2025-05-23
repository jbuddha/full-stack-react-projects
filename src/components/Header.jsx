import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { User } from './User.jsx'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)

    return (
      <nav>
        Logged in as <User id={sub} />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
        <Link to='/signup'>Sign Up</Link>
      </nav>
    )
  }

  return (
    <nav>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
    </nav>
  )
}

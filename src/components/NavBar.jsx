import { NavLink } from 'react-router-dom'

export default function NavBar({ colors }) {
  const linkClass = ({ isActive }) =>
    `text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors ${
      isActive ? 'text-white' : 'text-purple-200 hover:text-white'
    }`

  const linkStyle = ({ isActive }) =>
    isActive ? { backgroundColor: colors.main } : {}

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 shadow-md"
      style={{ backgroundColor: 'rgba(58, 20, 130, 0.97)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain rounded" />
        <span className="text-white font-bold text-sm tracking-wide">Onsite</span>
      </div>
      <div className="flex items-center gap-2">
        <NavLink to="/" end className={linkClass} style={linkStyle}>
          Schedule
        </NavLink>
        <NavLink to="/info" className={linkClass} style={linkStyle}>
          Info
        </NavLink>
      </div>
    </nav>
  )
}

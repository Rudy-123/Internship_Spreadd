import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      padding: '15px',
      backgroundColor: '#333',
      display: 'flex',
      gap: '20px',
      marginBottom: '20px'
    }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? '#FFD700' : 'white',  
          textDecoration: 'none',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? '#FFD700' : 'white',
          textDecoration: 'none',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        About
      </NavLink>
      <NavLink
        to="/products"
        style={({ isActive }) => ({
          color: isActive ? '#FFD700' : 'white',
          textDecoration: 'none',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        Products
      </NavLink>
    </nav>
  );
}
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  const buttonStyle = {
    ...linkStyle,
    backgroundColor: '#e74c3c',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/dashboard" style={{ ...linkStyle, fontSize: '1.2rem', fontWeight: 'bold' }}>
          Hospital System
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        {user.role === 'patient' && (
          <Link to="/book-appointment" style={linkStyle}>Book Appointment</Link>
        )}
        <span style={{ margin: '0 1rem' }}>Welcome, {user.name} ({user.role})</span>
        <button onClick={onLogout} style={buttonStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to MyPortfolio 👋</h1>
      <p>Create and share your personal portfolio easily.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/inscription" style={buttonStyle}>Sign Up</Link>
        <Link to="/connection" style={{ ...buttonStyle, marginLeft: '1rem' }}>Login</Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  textDecoration: 'none',
};

export default Home;
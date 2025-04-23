import React from 'react';

function Login() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label><br />
          <input type="email" />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
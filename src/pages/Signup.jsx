import React from 'react';

function Signup() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create an Account</h2>
      <form>
        <div>
          <label>Email:</label><br />
          <input type="email" />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
import React from 'react';

// PUBLIC_INTERFACE
function Navbar({ isAuthenticated, onLogout, onShowLogin, onShowRegister }) {
  /** Application navigation bar with auth controls */
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <span role="img" aria-label="chef">👨‍🍳</span>
        Recipe Explorer
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <button className="btn accent" onClick={onLogout}>Logout</button>
        ) : (
          <>
            <button className="btn" onClick={onShowLogin}>Login</button>
            <button className="btn accent" onClick={onShowRegister}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

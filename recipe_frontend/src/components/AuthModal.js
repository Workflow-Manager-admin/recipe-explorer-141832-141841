import React, { useState } from 'react';

// PUBLIC_INTERFACE
function AuthModal({ mode, onSubmit, onClose, error }) {
  /** Modal for login/register */
  const [form, setForm] = useState({ email: '', password: '' });

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal authmod" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 style={{ marginBottom: 10 }}>{mode === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            required
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            autoComplete="username"
          />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          <button type="submit" className="btn accent wide">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        {error && <div className="auth-error">{error}</div>}
      </div>
    </div>
  );
}

export default AuthModal;

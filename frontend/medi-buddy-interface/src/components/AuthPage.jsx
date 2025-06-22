
import React, { useState } from 'react';
import '../styles/auth.css';

const AuthPage = ({ role, onLogin, onBack }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onLogin(email, password, isSignup);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="logo-small">♥</div>
          <h1>MediCare Companion</h1>
          <p className="role-indicator">
            {role === 'patient' ? 'Patient Portal' : 'Caretaker Portal'}
          </p>
        </div>

        <div className="auth-form-container">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="auth-subtitle">
            {isSignup ? 'Sign up to get started' : 'Sign in to your account'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {isSignup && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button type="submit" className="auth-submit-button">
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button" 
                className="switch-button"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

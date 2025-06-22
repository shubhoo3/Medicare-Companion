
import React from 'react';
import '../styles/welcome.css';

const WelcomePage = ({ onRoleSelect }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="logo-container">
            <div className="logo">
              <div className="heart-icon">♥</div>
            </div>
          </div>
          <h1>Welcome to MediCare Companion</h1>
          <p>Your trusted partner in medication management. Choose your role to get started with personalized features.</p>
        </div>

        <div className="role-selection">
          <div className="role-card patient-card">
            <div className="role-icon patient-icon">👤</div>
            <h2>I'm a Patient</h2>
            <p>Track your medication schedule and maintain your health records</p>
            <ul>
              <li>• Mark medications as taken</li>
              <li>• Upload proof photos (optional)</li>
              <li>• View your medication calendar</li>
              <li>• Large, easy-to-use interface</li>
            </ul>
            <button 
              className="role-button patient-button"
              onClick={() => onRoleSelect('patient')}
            >
              Continue as Patient
            </button>
          </div>

          <div className="role-card caretaker-card">
            <div className="role-icon caretaker-icon">👥</div>
            <h2>I'm a Caretaker</h2>
            <p>Monitor and support your loved one's medication adherence</p>
            <ul>
              <li>• Monitor medication compliance</li>
              <li>• Set up notification preferences</li>
              <li>• View detailed reports</li>
              <li>• Receive email alerts</li>
            </ul>
            <button 
              className="role-button caretaker-button"
              onClick={() => onRoleSelect('caretaker')}
            >
              Continue as Caretaker
            </button>
          </div>
        </div>

        <p className="switch-note">You can switch between roles anytime after setup</p>
      </div>
    </div>
  );
};

export default WelcomePage;

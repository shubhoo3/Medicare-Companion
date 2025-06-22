import React, { useState, useEffect } from 'react';
import WelcomePage from '../components/WelcomePage';
import AuthPage from '../components/AuthPage';
import PatientDashboard from '../components/PatientDashboard';
import CaretakerDashboard from '../components/CaretakerDashboard';
import '../styles/global.css';
import axios from 'axios'; // ✅ Import axios here

const Index = () => {
  const [currentView, setCurrentView] = useState('welcome'); // welcome, auth, dashboard
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // patient or caretaker
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('mediCareUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
      setUserRole(userData.role);
      setCurrentView('dashboard');
    }
  }, []);

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentView('auth');
  };

  const handleLogin = async (email, password, isSignup = false) => {
    try {
      const payload = {
        email,
        password,
        role: userRole
      };

      const response = isSignup // backend
        ? await axios.post('http://localhost:5000/signup', payload)
        : await axios.post('http://localhost:5000/login', payload);

      const userData = response.data.user;

      localStorage.setItem('mediCareUser', JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      setCurrentView('dashboard');
    } catch (error) {
      alert('Login/Signup failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mediCareUser');
    setUser(null);
    setIsLoggedIn(false);
    setUserRole('');
    setCurrentView('welcome');
  };

  const handleRoleSwitch = (newRole) => {
    const updatedUser = { ...user, role: newRole };
    localStorage.setItem('mediCareUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setUserRole(newRole);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomePage onRoleSelect={handleRoleSelect} />;
      case 'auth':
        return (
          <AuthPage 
            role={userRole} 
            onLogin={handleLogin}
            onBack={() => setCurrentView('welcome')}
          />
        );
      case 'dashboard':
        return userRole === 'patient' ? (
          <PatientDashboard 
            user={user}
            onLogout={handleLogout}
            onRoleSwitch={handleRoleSwitch}
          />
        ) : (
          <CaretakerDashboard 
            user={user}
            onLogout={handleLogout}
            onRoleSwitch={handleRoleSwitch}
          />
        );
      default:
        return <WelcomePage onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentView()}
    </div>
  );
};

export default Index;

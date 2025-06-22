
import React, { useState } from 'react';
import '../styles/dashboard.css';

const PatientDashboard = ({ user, onLogout, onRoleSwitch }) => {
  const [selectedDate, setSelectedDate] = useState(22);

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = 30;
    const medicationTaken = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21];
    const missedDays = [2, 13, 14];

    for (let i = 1; i <= daysInMonth; i++) {
      let className = 'calendar-day';
      if (i === selectedDate) className += ' selected';
      if (medicationTaken.includes(i)) className += ' taken';
      if (missedDays.includes(i)) className += ' missed';

      days.push(
        <div key={i} className={className} onClick={() => setSelectedDate(i)}>
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-small">M</div>
          <div>
            <h1>Medicare Companion</h1>
            <p>Patient View</p>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="role-switch-button"
            onClick={() => onRoleSwitch('caretaker')}
          >
            👥 Switch to Caretaker
          </button>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-icon">👤</div>
          <h2>Good Afternoon!</h2>
          <p>Ready to stay on track with your medication?</p>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">0</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat">
            <div className="stat-icon">⭕</div>
            <div className="stat-label">Today's Status</div>
          </div>
          <div className="stat">
            <div className="stat-number">0%</div>
            <div className="stat-label">Monthly Rate</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="medication-section">
            <h3>📅 Today's Medication</h3>
            <div className="medication-item">
              <div className="medication-info">
                <div className="medication-number">1</div>
                <div>
                  <h4>Daily Medication Set</h4>
                  <p>Complete set of daily tablets</p>
                </div>
              </div>
              <div className="medication-time">🕐 8:00 AM</div>
            </div>

            <div className="photo-upload">
              <div className="upload-icon">📷</div>
              <h4>Add Proof Photo (Optional)</h4>
              <p>Take a photo of your medication or pill organizer as confirmation</p>
              <button className="photo-button">📷 Take Photo</button>
            </div>

            <button className="mark-taken-button">✓ Mark as Taken</button>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="calendar-section">
            <h3>Medication Calendar</h3>
            <div className="calendar-header">
              <button>←</button>
              <span>June 2025</span>
              <button>→</button>
            </div>
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-days">
                {generateCalendarDays()}
              </div>
            </div>
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-dot taken"></div>
                <span>Medication taken</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot missed"></div>
                <span>Missed medication</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot today"></div>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;


import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import '../styles/dashboard.css';

const CaretakerDashboard = ({ user, onLogout, onRoleSwitch }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const recentActivityData = [
    {
      date: 'Monday, June 10',
      time: 'Taken at 8:30 AM',
      status: 'completed',
      hasPhoto: true
    },
    {
      date: 'Sunday, June 9',
      time: 'Taken at 8:15 AM',
      status: 'completed',
      hasPhoto: false
    },
    {
      date: 'Saturday, June 8',
      time: 'Medication missed',
      status: 'missed',
      hasPhoto: false
    },
    {
      date: 'Friday, June 7',
      time: 'Taken at 8:45 AM',
      status: 'completed',
      hasPhoto: true
    },
    {
      date: 'Thursday, June 6',
      time: 'Taken at 8:20 AM',
      status: 'completed',
      hasPhoto: false
    }
  ];

  const renderOverview = () => (
    <div className="dashboard-content">
      <div className="main-content">
        <div className="status-section">
          <h3>📅 Today's Status</h3>
          <div className="status-item">
            <div className="status-info">
              <h4>Daily Medication Set</h4>
              <p>8:00 AM</p>
            </div>
            <div className="status-badge pending">Pending</div>
          </div>
        </div>

        <div className="progress-section">
          <h3>Monthly Adherence Progress</h3>
          <div className="progress-info">
            <span>Overall Progress</span>
            <span>85%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: '85%'}}></div>
          </div>
          <div className="progress-details">
            <div className="progress-item">
              <span>22 days</span>
              <span>Taken</span>
            </div>
            <div className="progress-item">
              <span>3 days</span>
              <span>Missed</span>
            </div>
            <div className="progress-item">
              <span>5 days</span>
              <span>Remaining</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="action-button">
            ✉️ Send Reminder Email
          </button>
          <button className="action-button">
            🔔 Configure Notifications
          </button>
          <button className="action-button">
            📅 View Full Calendar
          </button>
        </div>
      </div>
    </div>
  );

  const renderRecentActivity = () => (
    <div className="recent-activity-container">
      <h2 className="activity-title">Recent Medication Activity</h2>
      <div className="activity-list">
        {recentActivityData.map((activity, index) => (
          <div key={index} className={`activity-item ${activity.status}`}>
            <div className="activity-icon">
              {activity.status === 'completed' ? (
                <div className="check-icon">✓</div>
              ) : (
                <div className="warning-icon">⚠</div>
              )}
            </div>
            <div className="activity-details">
              <h4>{activity.date}</h4>
              <p>{activity.time}</p>
            </div>
            <div className="activity-status">
              {activity.hasPhoto && (
                <span className="photo-badge">📷 Photo</span>
              )}
              <span className={`status-badge ${activity.status}`}>
                {activity.status === 'completed' ? 'Completed' : 'Missed'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendarView = () => (
    <div className="calendar-view-container">
      <h2 className="calendar-title">Medication Calendar Overview</h2>
      <div className="calendar-content">
        <div className="calendar-section">
          <div className="calendar-header">
            <button>←</button>
            <span>June 2025</span>
            <button>→</button>
          </div>
          <div className="calendar-grid">
            <div className="calendar-weekdays">
              <div className="weekday">Su</div>
              <div className="weekday">Mo</div>
              <div className="weekday">Tu</div>
              <div className="weekday">We</div>
              <div className="weekday">Th</div>
              <div className="weekday">Fr</div>
              <div className="weekday">Sa</div>
            </div>
            <div className="calendar-days">
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                let className = 'calendar-day';
                if (day === 22) className += ' selected';
                else if ([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].includes(day)) {
                  className += Math.random() > 0.7 ? ' missed' : ' taken';
                }
                
                return (
                  <div key={day} className={className}>
                    {day}
                  </div>
                );
              })}
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
        <div className="calendar-details">
          <h3>Details for June 22, 2025</h3>
          <div className="day-details">
            <div className="detail-item">
              <div className="time-icon">🕐</div>
              <div>
                <strong>Today</strong>
                <p>Monitor Eleanor Thompson's medication status for today.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-container">
      <div className="notification-preferences">
        <h2 className="notifications-title">🔔 Notification Preferences</h2>
        
        <div className="notification-section">
          <div className="notification-header">
            <h3>Email Notifications</h3>
            <Switch defaultChecked />
          </div>
          <p className="notification-description">Receive medication alerts via email</p>
          
          <div className="email-input-group">
            <label>Email Address</label>
            <Input type="email" defaultValue="caretaker@example.com" />
          </div>
        </div>

        <div className="notification-section">
          <div className="notification-header">
            <h3>Missed Medication Alerts</h3>
            <Switch defaultChecked />
          </div>
          <p className="notification-description">Get notified when medication is not taken on time</p>
          
          <div className="alert-settings">
            <div className="setting-row">
              <label>Alert me if medication isn't taken within</label>
              <select className="time-select">
                <option value="2">2 hours</option>
                <option value="1">1 hour</option>
                <option value="3">3 hours</option>
              </select>
            </div>
            
            <div className="setting-row">
              <label>Daily reminder time</label>
              <Input type="time" defaultValue="20:00" className="time-input" />
            </div>
            
            <p className="reminder-note">Time to check if today's medication was taken</p>
          </div>
        </div>
      </div>

      <div className="email-preview">
        <h3>📧 Email Preview</h3>
        <div className="email-content">
          <div className="email-subject">
            <strong>Subject: Medication Alert - Eleanor Thompson</strong>
          </div>
          <div className="email-body">
            <p>Hello,</p>
            <p>This is a reminder that Eleanor Thompson has not taken her medication today.</p>
            <p>Please check with her to ensure she takes her prescribed medication.</p>
            <p>Current adherence rate: 85% (5-day streak)</p>
          </div>
        </div>
        <Button className="save-settings-btn">Save Notification Settings</Button>
      </div>
    </div>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'recent-activity':
        return renderRecentActivity();
      case 'calendar':
        return renderCalendarView();
      case 'notifications':
        return renderNotifications();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-small">M</div>
          <div>
            <h1>Medicare Companion</h1>
            <p>Caretaker View</p>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="role-switch-button"
            onClick={() => onRoleSwitch('patient')}
          >
            👤 Switch to Patient
          </button>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-hero caretaker-hero">
        <div className="hero-content">
          <div className="hero-icon">👥</div>
          <h2>Caretaker Dashboard</h2>
          <p>Monitoring Eleanor Thompson's medication adherence</p>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">85%</div>
            <div className="stat-label">Adherence Rate</div>
          </div>
          <div className="stat">
            <div className="stat-number">5</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat">
            <div className="stat-number">3</div>
            <div className="stat-label">Missed This Month</div>
          </div>
          <div className="stat">
            <div className="stat-number">4</div>
            <div className="stat-label">Taken This Week</div>
          </div>
        </div>
      </div>

      <div className="caretaker-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'recent-activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('recent-activity')}
        >
          Recent Activity
        </button>
        <button 
          className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar View
        </button>
        <button 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      {renderActiveTabContent()}
    </div>
  );
};

export default CaretakerDashboard;

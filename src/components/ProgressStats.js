import React from 'react';
const ProgressStats = ({ topics }) => {
  const totalTopics = topics.length;
  const completedTopics = topics.filter(topic => topic.status === 'Completed').length;
  const inProgressTopics = topics.filter(topic => topic.status === 'In Progress').length;
  const notStartedTopics = topics.filter(topic => topic.status === 'Not Started').length;
  const completionPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  if (totalTopics === 0) {
    return null;
  }
  return (
    <div className="progress-stats">
      <h2>📊 Progress Overview</h2>   
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#667eea' }}>{totalTopics}</div>
          <div className="stat-label">Total Topics</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#10b981' }}>{completedTopics}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#f59e0b' }}>{inProgressTopics}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#6b7280' }}>{notStartedTopics}</div>
          <div className="stat-label">Not Started</div>
        </div>
      </div>
      <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '600' }}>Overall Progress</span>
        <span style={{ fontWeight: '700', color: '#667eea' }}>{completionPercentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
export default ProgressStats;
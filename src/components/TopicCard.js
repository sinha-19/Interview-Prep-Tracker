import React from 'react';
const TopicCard = ({ topic, onUpdateStatus, onDeleteTopic, getNextStatus }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Not Started':
        return '⏳';
      case 'In Progress':
        return '🔄';
      case 'Completed':
        return '✅';
      default:
        return '⏳';
    }
  };
  const getCategoryClass = (category) => {
    return `badge badge-${category.toLowerCase()}`;
  };
  const getDifficultyClass = (difficulty) => {
    return `badge badge-${difficulty.toLowerCase()}`;
  };
  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'status-badge status-not-started';
      case 'In Progress':
        return 'status-badge status-in-progress';
      case 'Completed':
        return 'status-badge status-completed';
      default:
        return 'status-badge status-not-started';
    }
  };
  return (
    <div className="topic-card">
      <div className="topic-header">
        <div>
          <h3 className="topic-title">{topic.name}</h3>
          <div className="topic-badges">
            <span className={getCategoryClass(topic.category)}>
              {topic.category}
            </span>
            <span className={getDifficultyClass(topic.difficulty)}>
              {topic.difficulty}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDeleteTopic(topic.id)}
          className="delete-btn"
          title="Delete topic"
        >
          🗑️
        </button>
      </div>
      <div className="status-section">
        <div className={getStatusClass(topic.status)}>
          <span>{getStatusIcon(topic.status)}</span>
          <span>{topic.status}</span>
        </div>
      </div>
      <div className="topic-actions">
        <button
          onClick={() => onUpdateStatus(topic.id, getNextStatus(topic.status))}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          {topic.status === 'Completed' ? 'Reset' : 'Update Status'}
        </button>
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
        Added {new Date(topic.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};
export default TopicCard;
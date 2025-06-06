import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ProgressStats from './components/ProgressStats';
import AddTopicForm from './components/AddTopicForm';
import TopicCard from './components/TopicCard';
import QuizModal from './components/QuizModal';
import Footer from './components/Footer';
function App() {
  const [topics, setTopics] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  useEffect(() => {
    const savedTopics = localStorage.getItem('interview-prep-topics');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('interview-prep-topics', JSON.stringify(topics));
  }, [topics]);
  const addTopic = (topicData) => {
    const newTopic = {
      id: Date.now().toString(),
      ...topicData,
      status: 'Not Started',
      createdAt: new Date().toISOString()
    };
    setTopics([...topics, newTopic]);
  };
  const updateTopicStatus = (id, status) => {
    const topic = topics.find(t => t.id === id);
    if ((status === 'In Progress' || status === 'Completed') && topic.status === 'Not Started') {
      setSelectedTopic(topic);
      setNewStatus(status);
      setShowQuiz(true);
    } else if (status === 'Completed' && topic.status === 'In Progress') {
      setSelectedTopic(topic);
      setNewStatus(status);
      setShowQuiz(true);
    } else {
      setTopics(topics.map(topic => 
        topic.id === id ? { ...topic, status } : topic
      ));
    }
  };
  const handleQuizComplete = (passed) => {
    if (passed) {
      setTopics(topics.map(topic => 
        topic.id === selectedTopic.id ? { ...topic, status: newStatus } : topic
      ));
    }
    setShowQuiz(false);
    setSelectedTopic(null);
    setNewStatus('');
  };
  const deleteTopic = (id) => {
    setTopics(topics.filter(topic => topic.id !== id));
  };
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Not Started':
        return 'In Progress';
      case 'In Progress':
        return 'Completed';
      case 'Completed':
        return 'Not Started';
      default:
        return 'Not Started';
    }
  };
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <ProgressStats topics={topics} />
          <AddTopicForm onAddTopic={addTopic} />
          {topics.length === 0 ? (
            <div className="empty-state">
              <h3>No topics added yet</h3>
              <p>Start by adding your first interview preparation topic!</p>
            </div>
          ) : (
            <div className="topics-grid">
              {topics.map(topic => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onUpdateStatus={updateTopicStatus}
                  onDeleteTopic={deleteTopic}
                  getNextStatus={getNextStatus}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      {showQuiz && (
        <QuizModal
          topic={selectedTopic}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
      <Footer />
    </div>
  );
}
export default App;
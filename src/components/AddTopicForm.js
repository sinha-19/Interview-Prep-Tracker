import React, { useState } from 'react';
const AddTopicForm = ({ onAddTopic }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'DSA',
    difficulty: 'Medium'
  });
  const categories = ['DSA', 'OS', 'DBMS', 'CN'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAddTopic(formData);
      setFormData({ name: '', category: 'DSA', difficulty: 'Medium' });
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="add-topic-section">
      <h2>➕ Add New Topic</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Topic Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Binary Search Trees"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Topic
        </button>
      </form>
    </div>
  );
};
export default AddTopicForm;
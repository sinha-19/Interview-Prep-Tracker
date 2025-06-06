import React, { useState } from 'react';

const QuizModal = ({ topic, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const getQuestions = (category) => {
    const questionBank = {
      DSA: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correct: 1
        },
        {
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correct: 1
        },
        {
          question: "What is the worst-case time complexity of quicksort?",
          options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
          correct: 1
        }
      ],
      OS: [
        {
          question: "What is a deadlock in operating systems?",
          options: ["Memory leak", "Process waiting indefinitely", "CPU overload", "Disk failure"],
          correct: 1
        },
        {
          question: "Which scheduling algorithm gives minimum average waiting time?",
          options: ["FCFS", "SJF", "Round Robin", "Priority"],
          correct: 1
        },
        {
          question: "What is virtual memory?",
          options: ["RAM only", "Storage technique using disk", "Cache memory", "ROM"],
          correct: 1
        }
      ],
      DBMS: [
        {
          question: "What does ACID stand for in databases?",
          options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Index, Data", "Auto, Create, Insert, Delete", "None of the above"],
          correct: 0
        },
        {
          question: "Which normal form eliminates transitive dependency?",
          options: ["1NF", "2NF", "3NF", "BCNF"],
          correct: 2
        },
        {
          question: "What is a primary key?",
          options: ["Foreign key", "Unique identifier", "Index", "Constraint"],
          correct: 1
        }
      ],
      CN: [
        {
          question: "Which layer of OSI model handles routing?",
          options: ["Physical", "Data Link", "Network", "Transport"],
          correct: 2
        },
        {
          question: "What is the default port for HTTP?",
          options: ["21", "23", "80", "443"],
          correct: 2
        },
        {
          question: "Which protocol is used for email transfer?",
          options: ["HTTP", "FTP", "SMTP", "TCP"],
          correct: 2
        }
      ],
    };
    return questionBank[category] || questionBank.DSA;
  };
  const questions = getQuestions(topic.category);
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };
  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResult(true);
  };
  const handleComplete = () => {
    const passed = score >= Math.ceil(questions.length * 0.6);
    onComplete(passed);
  };
  const passingScore = Math.ceil(questions.length * 0.6);
  const passed = score >= passingScore;
  if (showResult) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>🎯 Quiz Results for {topic.name}</h3>
          <div className={`quiz-result ${passed ? 'pass' : 'fail'}`}>
            <h4>{passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}</h4>
            <p>You scored {score} out of {questions.length}</p>
            <p>{passed ? 'You can proceed to update your status!' : `You need ${passingScore} correct answers to pass.`}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {passed && (
              <button onClick={handleComplete} className="btn btn-success">
                Update Status
              </button>
            )}
            <button onClick={onClose} className="btn btn-secondary">
              {passed ? 'Close' : 'Try Again Later'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>📝 Quick Quiz: {topic.name}</h3>
        <p>Answer {passingScore} out of {questions.length} questions correctly to proceed.</p>
        <div className="quiz-question">
          <h4>Question {currentQuestion + 1} of {questions.length}</h4>
          <p>{questions[currentQuestion].question}</p>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index} className="quiz-option">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(currentQuestion, index)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleNext} 
            className="btn btn-primary"
            disabled={answers[currentQuestion] === undefined}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuizModal;
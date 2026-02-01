import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import './Screen1.css'

function Screen1({ setInputString }) {

  const [text, setText] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const navigate = useNavigate();

  function handleInputChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length === 0) {
      setToast({ show: true, message: 'Please provide a non-empty string!', type: 'error' });
    }
    else if (!text.replace(/\s/g, '').length) {
      setToast({ show: true, message: "Contains only spaces!", type: 'error' });
      setText('');
    }
    else {
      setInputString(text.trim());
      navigate('/screen2');
    }
  }

  return (
    <div className="screen1">
      <h1 className='heading'>Duplicate Character Remover</h1>

      <form onSubmit={handleSubmit} className="screen1_form">
        <div className="input-group">
          <label className='screen1_label'>
            Input String
          </label>
          <input
            type="text"
            placeholder="Type something here..."
            value={text}
            onChange={handleInputChange}
            className="screen1_input"
          />
        </div>
        <button type="submit" className='button'>Analyze String</button>
      </form>

      <div className="how-it-works">
        <h2>How it works</h2>
        <p>
          This tool helps you identify and remove duplicate characters from any string.
          Simply enter your text above, and on the next screen, you can interactively
          remove specific characters or clean up the entire string at once.
        </p>
        <div className="example-box">
          <strong>Example:</strong> "Cincinnati" &rarr; [C, i, n, c, i, n, n, a, t, i] &rarr; Click on first 'i' &rarr; "Cincnnat"
        </div>
      </div>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default Screen1;

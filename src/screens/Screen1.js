import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Screen1.css'

function Screen1({ setInputString }) {

  const [text, setText] = useState('');
  const navigate = useNavigate();

  function handleInputChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length === 0) {
      alert('Please provide a non-empty string!');
    }
    else if (!text.replace(/\s/g, '').length) {
      alert("Contains only spaces!");
      setText('');
    }
    else {
      setInputString(text.trim());
      navigate('/screen2');
    }
  }

  return (
    <div className="screen1">
      <h1 className='heading'>Remove Duplicate Characters</h1>


      <form onSubmit={handleSubmit} className="screen1_form">
        <label className='screen1_label'>
          Input String:
        </label>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          className="screen1_input"
        />
        <button type="submit" className='button'>Submit</button>
      </form>
    </div>
  );
}

export default Screen1;

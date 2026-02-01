import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';
import './Screen2.css'

function Screen2({ inputString }) {

  // Set of indices from the original inputString that are currently "removed"
  const [removedIndices, setRemovedIndices] = useState(new Set())
  // To check whether the string contains unique character or not
  const [unique, setUnique] = useState(false)
  // Toast state
  const [showToast, setShowToast] = useState(false)
  // Case sensitive toggle state
  const [isCaseSensitive, setIsCaseSensitive] = useState(true)

  // Derived: The current result string based on removed indices
  const result = [...inputString]
    .filter((_, i) => !removedIndices.has(i))
    .join('');

  // To check duplicate characters, returns true if a string does not contain any duplicate characters.
  const hasUniqueChars = useCallback((s) => {
    let seen = new Set();
    for (let c of s) {
      let compareChar = isCaseSensitive ? c : c.toLowerCase();
      if (seen.has(compareChar)) {
        return false;
      }
      seen.add(compareChar);
    }
    return true;
  }, [isCaseSensitive]);

  useEffect(() => {
    if (hasUniqueChars(result)) {
      // Set true if there are only unique characters left 
      if (!unique && result.length > 0 && removedIndices.size > 0) setShowToast(true);
      setUnique(true);
    } else {
      setUnique(false);
    }
  }, [result, unique, hasUniqueChars, removedIndices.size])

  // To delete all characters except clicked one
  const handleDeleteCharacter = (char, index) => {
    try {
      const newRemoved = new Set(removedIndices);

      // Find all matching characters in the original string
      for (let i = 0; i < inputString.length; i++) {
        const currentChar = inputString[i];
        const isMatch = isCaseSensitive
          ? currentChar === char
          : currentChar.toLowerCase() === char.toLowerCase();

        // Remove all matches except the one that was specifically clicked
        if (isMatch && i !== index) {
          newRemoved.add(i);
        }
      }

      setRemovedIndices(newRemoved);
      console.log(`Successfully removed variations of '${char}' keeping index ${index}`);
    } catch (error) {
      console.log(error);
    }
  }

  // To remove all duplicate characters at once 
  const handleRemoveAllDuplicates = () => {
    let seen = new Set();
    const newRemoved = new Set(removedIndices);

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      let compareChar = isCaseSensitive ? char : char.toLowerCase();

      if (seen.has(compareChar)) {
        newRemoved.add(i);
      } else {
        seen.add(compareChar);
      }
    }
    setRemovedIndices(newRemoved);
  }

  // Show error message if input string is empty
  if (inputString.length === 0 || inputString === undefined) {
    return (
      <div className='error_message_main_div'>
        <div className='error_message_div'>
          <h1 className='error_message_heading'>Oops! No data found.</h1>
          <p style={{ marginBottom: '2rem' }}>Please enter a string on the home screen first.</p>
          <div className='error_message_button_div'>
            <Link to="/"><button className='button'>Go Back Home</button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='page-container-full'>
      <div className='layout-horizontal'>
        <aside className='sidebar-revamp'>
          <div className='sidebar-header'>
            <Link to="/"><button className='btn-back-revamp'>&larr; Back</button></Link>
            <h2 className='sidebar-title'>Settings</h2>
          </div>

          <div className='sidebar-section'>
            <div className='setting-item'>
              <label className='setting-label'>Case Sensitivity</label>
              <div className="toggle-container-revamp">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isCaseSensitive}
                    onChange={() => setIsCaseSensitive(!isCaseSensitive)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className='toggle-status-text'>{isCaseSensitive ? 'ON' : 'OFF'}</span>
              </div>
              <p className="setting-desc">
                {isCaseSensitive ? "A ≠ a" : "A = a"}
              </p>
            </div>
            <div className='setting-item' style={{ marginTop: '1.5rem' }}>
              <button
                className='btn-back-revamp'
                onClick={() => setRemovedIndices(new Set())}
                style={{ width: '100%', fontSize: '0.9rem' }}
              >
                Reset All
              </button>
            </div>
          </div>

          <div className='sidebar-section footer-revamp'>
            <button
              className={`button btn-auto-clean ${unique ? 'btn-disabled' : ''}`}
              onClick={handleRemoveAllDuplicates}
              disabled={unique}
            >
              Auto-Clean
            </button>
          </div>
        </aside>

        <main className='main-content-revamp'>
          <h1 className='heading-revamp'>Analysis Results</h1>

          <div className='results-grid'>
            <div className={`result-card-revamp ${unique ? 'preview-unique' : ''}`}>
              <h3>Current Preview</h3>
              <div className={`text-display-box`}>
                {result || <span className='empty-text'>(Empty String)</span>}
              </div>
              <p className='text-meta'>Original: <span className='muted-text'>{inputString}</span></p>
            </div>
          </div>

          <div className='interactions-revamp'>
            <div className='interaction-section'>
              <h3>Character Tiles <small className='muted-text'>(Hover on any tile to remove duplicates)</small></h3>
              <div className='tiles-container-revamp'>
                {[...inputString]?.map((char, i) => {
                  return <Card character={char} key={i} index={i} handleDeleteCharacter={handleDeleteCharacter} />
                })}
              </div>
            </div>

            <div className='interaction-section'>
              <h3>Resultant Cards</h3>
              {result !== '' ? (
                <div className='tiles-container-revamp'>
                  {[...result].map((char, i) => {
                    const charCode = char.toLowerCase().charCodeAt(0);
                    const color = "#" + ((charCode * 123456) % 16777215).toString(16);
                    return (
                      <div key={i} className="string_card_box result_card_box" style={{ backgroundColor: color }}>
                        <h1 className='string_card_heading'>{char === ' ' ? '␣' : char}</h1>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="empty-state">Interact with tiles above to see result cards here.</p>
              )}
            </div>
          </div>
        </main>
        <Toast
          show={showToast}
          message="Character cleanup complete! Your string is now unique."
          type="success"
          onClose={() => setShowToast(false)}
        />
      </div >
    </div >
  )
}

export default Screen2;

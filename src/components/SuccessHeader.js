import React from 'react';
import PropTypes from 'prop-types';
import './SuccessHeader.css'

function SuccessHeader({ unique, result }) {
  return (
    <div className='success-header-container'>
      {unique && (
        <div className='success_header'>
          <div className="success-icon">✓</div>
          <div className="success-text">
            <h3>Clean!</h3>
            <p>No duplicate characters remaining.</p>
          </div>
        </div>
      )}
    </div>
  );
}

SuccessHeader.propTypes = {
  originalString: PropTypes.string,
  resultString: PropTypes.string,
};

export default SuccessHeader;

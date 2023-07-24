import React from 'react';
import PropTypes from 'prop-types';
import './SuccessHeader.css'

function SuccessHeader({ unique, result }) {
  return (
    <div>
      {unique && <>
        <div className='success_header'>
            <p className=''>Success! There are no Duplicate characters in the string.</p>
            <p>Resultant String: {result}</p>
        </div>
        </>}
    </div>
  );
}

SuccessHeader.propTypes = {
  originalString: PropTypes.string,
  resultString: PropTypes.string,
};

export default SuccessHeader;

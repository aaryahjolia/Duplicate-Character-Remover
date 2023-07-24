import React, { useState, useEffect } from 'react';
import SuccessHeader from '../components/SuccessHeader';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import './Screen2.css'

function Screen2({ inputString }) {

  // For resultant string
  const [result, setResult] = useState(inputString)
  // To display remaining cards after deletion
  const [leftString, setLeftString] = useState('')
  // To check whether the string contains unique character or not
  const [unique, setUnique] = useState(false)

  // To check duplicate characters, returns true if the input string does not contain any duplicate characters.
  function hasUniqueChars(s) {
    let seen = new Set();
    for (let i = 0; i < s.length; i++) {
      let c = s.charAt(i);
      if (seen.has(c)) {
        return false;
      }
      seen.add(c);
    }
    return true;
  }

  useEffect(() => {
    if (hasUniqueChars(result)) {
      // Set true if there are only unique characters left 
      setUnique(true);
    }
  }, [result])

  // To delete all characters except clicked one
  const handleDeleteCharacter = (char, index) => {
    try {
      let newResult = "";

      // For Case sensitive:
      for (let i = 0; i < result.length; i++) {
        if (i === index || result.charAt(i) !== char) {
          newResult += result.charAt(i);
        }
      }

      // For Case Insensitive:

      // for (let i = 0; i < result.length; i++) {
      //   if (i === index || result.charAt(i).toLowerCase() !== char.toLowerCase()) {
      //     newResult += result.charAt(i);
      //   }
      // }

      setResult(newResult);
      setLeftString(newResult);
      console.log(`Successfully removed '${char}'`);
    } catch (error) {
      console.log(error);
    }
  }

  // Show error message if input string is empty
  if (inputString.length === 0 || inputString === undefined) {
    return (
      <div className='error_message_main_div'>
        <div className='error_message_div'>
          <h1 className='error_message_heading'>Something went wrong! Please Click below button to Go back</h1>
          <div className='error_message_button_div'>
            <Link to="/"><button className='button'>Go Back</button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section>
        <h1 className='heading'>Remove Duplicate Characters</h1>
        <div className="screen2">

          <SuccessHeader unique={unique} result={result}/>


          <div className='result_div'>
            <p><b>Original String:</b> {inputString}</p>
            <p><b>Resultant string:</b> {result}</p>
          </div>

          <div className="string_main_div">
            <div className=''>
              <h1 className=''>Original String cards:</h1>
            </div>
            <div className='string_cards_div'>
              {[...inputString]?.map((char, i) => {
                return <Card character={char} key={i} index={i} handleDeleteCharacter={handleDeleteCharacter} />
              })}
            </div>
          </div>


          <div className="string_main_div">
            <div className=''>
              <h1 className=''>Resultant String cards:</h1>
            </div>
            
            {leftString !== '' ? (
              <div className='string_cards_div'>
                {[...leftString].map((char, i) => {
                  return (
                    <div key={i} className="string_card_box">
                      <h1 className='string_card_heading'>{char}</h1>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{margin: ".5rem 0"}}>The resultant string is empty! Please delete any character from Original string to see resultant string.</p>
            )}

          </div>


          <div className='home_button_div'>
            <Link to="/"><button className='button'>Go Back</button></Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Screen2;

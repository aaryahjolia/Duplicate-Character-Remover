import React from 'react'

function Card({ character, handleDeleteCharacter, index }) {

  //Function to generate bgColor by taking a input character
  const getBgColor = (char) => {
    // taking bg color same for the alphabet either its uppercase or lowercase 
    const charCode = char.toLowerCase().charCodeAt(0);
    // Use the ASCII code to generate hex colorCode
    const colorCode = "#" + ((charCode * 123456) % 16777215).toString(16);
    return colorCode;
  }
  return (
    <>
      <div className='string_card_box' style={{
        backgroundColor: getBgColor(character),
        boxShadow: `0 4px 12px ${getBgColor(character)}44`
      }}>
        <button className='string_card_button' title='Remove all occurrences' onClick={() => handleDeleteCharacter(character, index)}>
          &times;
        </button>
        <h1 className='string_card_heading'>{character === ' ' ? '␣' : character}</h1>
      </div>
    </>
  )
}

export default Card
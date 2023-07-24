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
      <div className='string_card_box' style={{ backgroundColor: getBgColor(character) }}>
        {/* <div className='string_card_inner_box'> */}
          <button className='string_card_button' title='Delete' onClick={() => handleDeleteCharacter(character, index)}>&#10060;</button>
          <h1 className='string_card_heading'>{character === ' ' ? '' : character}</h1>
          {/* <hr className='string_card_hr_line'/> */}
          {/* <p className='string_card_index_heading'>{index}</p> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default Card
import React, { useState } from 'react';

export default function Select() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleCharacterSelect = (characterName) => {
    if (selectedCharacters.includes(characterName)) {
      setSelectedCharacters(selectedCharacters.filter(name => name !== characterName));
    } else {
      setSelectedCharacters([...selectedCharacters, characterName]);
    }
  }

  const handleSelectAll = () => {
    console.log(selectedCharacters);
  }

  const renderCharacterButton = (src) => {
    const characterName = src.split('/')[2].split('.')[0];
    const isSelected = selectedCharacters.includes(characterName);
    const buttonText = isSelected ? 'Selected' : 'Select';

    return (
      <div className="w-28 border-2 contrast-200 border-dashed">
        <img src={src} alt="" />
        <button
          className='text-white bg-black px-8 '
          onClick={() => handleCharacterSelect(characterName)}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <div className="py-14">
      <div className="flex">
        {renderCharacterButton('/char/avatar.gif')}
        {renderCharacterButton('/char/bluesword.gif')}
        {renderCharacterButton('/char/brutal.gif')}
        {renderCharacterButton('/char/greenlizard.gif')}
        {renderCharacterButton('/char/heavybot.gif')}
        {renderCharacterButton('/char/hecto.gif')}
        {renderCharacterButton('/char/jumblo.gif')}
        {renderCharacterButton('/char/redflame.gif')}
      </div>
      <br />
      {selectedCharacters.length === 3 && <button className='text-white bg-black px-8 ' onClick={handleSelectAll}>Select All Characters</button>}
    </div>
  )
}

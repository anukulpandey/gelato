import React, { useState } from 'react';
import { mintMultiple } from '../utils/mintMutliple';

export default function Select(props) {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { contractDetails, setPlayer1Chars, setIsDeployed, address } = props;

  const handleCharacterSelect = (characterName) => {
    if (selectedCharacters.includes(characterName)) {
      setSelectedCharacters(selectedCharacters.filter(name => name !== characterName));
    } else {
      setSelectedCharacters([...selectedCharacters, characterName]);
    }
  }

  const handleSelectAll = async () => {
    setIsProcessing(true);
    try {
      setPlayer1Chars(selectedCharacters);
      console.log(contractDetails);
      await mintMultiple(contractDetails.CONTRACT_ADDRESS, contractDetails.COUNTER_CONTRACT_ABI, contractDetails.web3AuthProvider, selectedCharacters[0], selectedCharacters[1], selectedCharacters[2]);
      setIsDeployed(true);
    } catch (error) {
      console.log(error);
    }
    setIsProcessing(false);
  }

  const renderCharacterButton = (src) => {
    const characterName = src.split('/')[2].split('.')[0];
    const isSelected = selectedCharacters.includes(characterName);
    const buttonText = isSelected ? '✅' : 'Select';

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
      {selectedCharacters.length === 3 && !isProcessing && <>
        <button className='text-white text-2xl bg-black px-8 ' onClick={handleSelectAll}>Select these Characters</button>
        <p className='text-white'>PS: These NFTs will be visible on <a className='text-blue' href={`https://testnets.opensea.io/${address}/collected`}>Opensea</a> as well</p>
        <a className='text-white underline' href={`https://testnets.opensea.io/${address}/collected`}>Click here to check it out</a>
      </>}
      {isProcessing && <div className="text-white text-2xl bg-black px-8">Processing... <div className="spinner"><p className='text-white'>PS: These NFTs will be visible on <a className='text-blue' href={`https://testnets.opensea.io/${address}/collected`}>Opensea</a> as well</p>
        <a className='text-white underline' href={`https://testnets.opensea.io/${address}/collected`}>Click here to check it out</a></div></div>}
    </div>
  )
}

export const determineWinner= (player1: string, player2: string,setStop:any)=>{
    setStop(true);
    const charArray = ['bluesword', 'greenlizard', 'heavybot', 'redflame', 'avatar', 'monkey', 'jumblo', 'hecto', 'brutal'];
    const characterValues: {[character: string]: number} = {};
    charArray.forEach((char) => {
      characterValues[char] = Math.random();
    });
    alert(characterValues[player1]>= characterValues[player2]);
  }
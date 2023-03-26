export const determineWinner=async (player1: string, player2: string,setStop:any,mint:any,burn:any,setTransactionInProgress:any,setAreYouWinningSon:any)=>{
  setTransactionInProgress(true);
    setStop(true);
    const charArray = ['bluesword', 'greenlizard', 'heavybot', 'redflame', 'avatar', 'monkey', 'jumblo', 'hecto', 'brutal'];
    const characterValues: {[character: string]: number} = {};
    charArray.forEach((char) => {
      characterValues[char] = Math.random();
    });
    if(characterValues[player1]>= characterValues[player2]){
      await mint();
      setAreYouWinningSon(true);
    }else{
      await burn();
      setAreYouWinningSon(false);
    }
  }
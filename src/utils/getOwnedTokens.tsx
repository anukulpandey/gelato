import { GaslessOnboarding, GaslessWalletConfig, LoginConfig } from "@gelatonetwork/gasless-onboarding";
import { ethers } from "ethers";
import {characterLookup} from "../constants/reverseCharacterLookup";

interface ImageData {
  image: string;
}

export const getOwnedTokens = async(CONTRACT_ADDRESS:string,COUNTER_CONTRACT_ABI:any,web3AuthProvider:any,address:string,setPlayer1Chars:any,setTokenIds:any)=>{
    try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
      let result:[ethers.BigNumber] = await contract.getOwnedTokens(ethers.utils.getAddress(address));
      let resultAsNumbers: number[] = result.map(bn => bn.toNumber());
      console.log(resultAsNumbers);
      setTokenIds(resultAsNumbers);
      let characters = [];
      for(let i=0;i<result.length;i++){
        // console.log(result[i].toNumber());
        let base64String = await contract.tokenURI(result[i].toNumber());
        const encodedString = base64String.split(',')[1];

    // Decode the base64-encoded string
    const decodedString = atob(encodedString);
    const parsedObject:string = JSON.parse(decodedString)["image"];
      characters.push(characterLookup[parsedObject]);
      }
      setPlayer1Chars(characters);
    } catch (error) {
      console.log(error);
    }
  }
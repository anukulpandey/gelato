import { GaslessOnboarding, GaslessWalletConfig, LoginConfig } from "@gelatonetwork/gasless-onboarding";
import { ethers } from "ethers";

export const burnNFT = async(CONTRACT_ADDRESS:string,COUNTER_CONTRACT_ABI:any,web3AuthProvider:any,player1Chars:string[],tokenIds:any,player1:string)=>{
    try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
    const idx:number = player1Chars.indexOf(player1);
    const tokenId: ethers.BigNumber = tokenIds[idx];
      let { data } = await contract.populateTransaction.burn(tokenId);
      console.log(data!.toString());
      const smartWalletConfig: GaslessWalletConfig = { apiKey: "9gvM5yp4oHHAreWU1y9t7_b4E2CaBVWrYR5f9WkkaAA_" };
      const loginConfig: LoginConfig = {
        domains: [window.location.origin],
        chain: {
          id: 80001,
          rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        },
        ui: {
          theme: "dark",
        },
        openLogin: {
          redirectUrl: `${window.location.origin}/?chainId=${84531}`,
        },
      };
      const gelatoLogin = new GaslessOnboarding(
        loginConfig,
        smartWalletConfig
      );
      await gelatoLogin.init();
      let gelatoSmartWallet = gelatoLogin.getGaslessWallet();
      if(!gelatoSmartWallet){
        alert("smart wallet not initiated");
      }else{
        const { taskId } = await gelatoLogin!.getGaslessWallet().sponsorTransaction(
          CONTRACT_ADDRESS,
          data!
          );
          console.log("https://relay.gelato.digital/tasks/status/"+taskId);
          console.log("burnt");
      }
    } catch (error) {
      console.log(error);
    }
  }
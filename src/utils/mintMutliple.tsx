import { GaslessOnboarding, GaslessWalletConfig, LoginConfig } from "@gelatonetwork/gasless-onboarding";
import { ethers } from "ethers";

export const mintMultiple = async(CONTRACT_ADDRESS:string,COUNTER_CONTRACT_ABI:any,web3AuthProvider:any,charName1:string,charName2:string,charName3:string)=>{
    try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
      let { data } = await contract.populateTransaction.mintMultiple(charName1,charName2,charName3);
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
          console.log("minted "+charName1 + ',' + charName2 + ',' +charName3);
      }
    } catch (error) {
      console.log(error);
    }
  }
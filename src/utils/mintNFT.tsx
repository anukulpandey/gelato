import { GaslessOnboarding, GaslessWalletConfig, LoginConfig } from "@gelatonetwork/gasless-onboarding";
import { ethers } from "ethers";

export const mintNFT = async(CONTRACT_ADDRESS:string,COUNTER_CONTRACT_ABI:any,web3AuthProvider:any)=>{
    try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
      let { data } = await contract.populateTransaction.mint("heavybot");
      console.log(data!.toString());
      const smartWalletConfig: GaslessWalletConfig = { apiKey: "DD42Cz1XfB_51WMhE3cST_3BEPFLHe_6utg2ZJxvDXg_" };
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
          alert("https://relay.gelato.digital/tasks/status/"+taskId);
      }
    } catch (error) {
      console.log(error);
    }
  }
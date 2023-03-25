import { GaslessOnboarding, GaslessWalletConfig, LoginConfig } from "@gelatonetwork/gasless-onboarding";

export const initialized = async (setIsLoading:any,setGelatoLogin:any,setWeb3AuthProvider:any,provider:any,getGaslessWallet:any) => {
    setIsLoading(true);
    try {
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
      setGelatoLogin(gelatoLogin);
      const _provider = gelatoLogin.getProvider();
      if (_provider) {
        setWeb3AuthProvider(provider);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      getGaslessWallet();
    }
  };

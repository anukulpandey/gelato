import { useEffect, useState } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
// import "./App.css"; //import this for tailwind css
import { ethers } from "ethers";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";

function App() {
  const [gelatoLogin, setGelatoLogin] = useState<
    GaslessOnboarding | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider | null>(null);
  const [user, setUser] = useState<Partial<UserInfo> | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  const [provider, setProvider] = useState<SafeEventEmitterProvider|null>(null);
  const [gaslessWallet, setGaslessWallet] = useState<GaslessWalletInterface | null>(null);
  const [wallet, setWallet] = useState<{
    address: string;
    balance: string;
    chainId: number;
  } | null>(null);
  const [isDeployed, setIsDeployed] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (!gelatoLogin || !web3AuthProvider) {
        return;
      }
      setIsLoading(true);
      const web3Provider = new ethers.providers.Web3Provider(web3AuthProvider!);
      const signer = web3Provider.getSigner();
      setWallet({
        address: await signer.getAddress(),
        balance: (await signer.getBalance()).toString(),
        chainId: await signer.getChainId(),
      });
      const user = await gelatoLogin.getUserInfo();
      setUser(user);
      const gelatoSmartWallet = gelatoLogin.getGaslessWallet();
      setIsDeployed(await gelatoSmartWallet.isDeployed());
      setIsLoading(false);
    };
    init();
  }, [web3AuthProvider]);

  const init = async () => {
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
      const provider = gelatoLogin.getProvider();
      if (provider) {
        setWeb3AuthProvider(provider);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (!isInit) {
      init();
      setIsInit(true);
    }
    if (!gelatoLogin) {
      return;
    }
    const web3authProvider = await gelatoLogin.login();
    setWeb3AuthProvider(web3authProvider);
  };

  const logout = async () => {
    if (!gelatoLogin) {
      return;
    }
    await gelatoLogin.logout();
    setWeb3AuthProvider(null);
    setWallet(null);
    setUser(null);
  };

  const getGaslessWallet = async () => {
    if (!gelatoLogin) {
      return;
    }
    const _gasslessWallet: GaslessWalletInterface = gelatoLogin.getGaslessWallet();
    console.log("initializing ...")
    await _gasslessWallet.init();
    console.log("initialized gasless wallet")
    setGaslessWallet(_gasslessWallet);
    alert(_gasslessWallet.getAddress());
    console.log("GASLESSWALLET INITIATED:" + _gasslessWallet.isInitiated());
  }

  const getContract = async()=>{
    const CONTRACT_ADDRESS:string="0xBf17E7a45908F789707cb3d0EBb892647d798b99";
    const COUNTER_CONTRACT_ABI = ["function increment() external",
    "function counter() public view returns(uint256)"];
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
    // console.log(contract);
    let counterValue = await contract.counter();
    console.log(counterValue.toString());
  }

  const increment = async()=>{
    try {
      const CONTRACT_ADDRESS:string="0xBf17E7a45908F789707cb3d0EBb892647d798b99";
    const COUNTER_CONTRACT_ABI = ["function increment() external",
    "function counter() public view returns(uint256)"];
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
      let { data } = await contract.populateTransaction.increment();
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
      console.log(gelatoSmartWallet!);
      console.log("=========");
      if(!gelatoSmartWallet){
        console.log("smart wallet not initiated");
      }else{
        const { taskId } = await gelatoLogin!.getGaslessWallet().sponsorTransaction(
          "0xBf17E7a45908F789707cb3d0EBb892647d798b99",
          data!
          );
          console.log(taskId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loggedInView = isLoading ? (
    <p>loading...</p>
  ) : (
    <div>
      <p>Yo! You have logged in</p>
      <p>{user?.email}</p>
      <p>{user?.profileImage}</p>
      <p>{user?.name}</p>
      <button onClick={getGaslessWallet}>get gasless wallet</button>
      <button onClick={async () => alert(await gaslessWallet!.isDeployed())}>is gasless wallet deployed?</button>
      <button onClick={()=>alert(wallet?.address)}>get wallet address</button>
      <button onClick={getContract}>get contract</button>
      <button onClick={increment}>increment</button>
    </div>
  );

  const toLoginInView = (
    <div>
      <h2>Gelato Gasless Wallet Minimal</h2>
      <div>
        <button
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );

  return (
    <>
      {web3AuthProvider && (
        <div >
          <button
            onClick={logout}
          >
            <p >Logout</p>
          </button>
        </div>
      )}
      <div >
        {web3AuthProvider ? loggedInView : toLoginInView}
      </div>
    </>
  );
}

export default App;

// reference : https://www.gelato.network/blog/how-to-use-gelato-s-gasless-wallet-sdk#social-login
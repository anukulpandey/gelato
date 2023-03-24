import { useEffect, useState } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { ethers } from "ethers";
import {GaslessOnboarding,GaslessWalletConfig,GaslessWalletInterface,LoginConfig,} from "@gelatonetwork/gasless-onboarding";
// import "./App.css"; //import this for tailwind css

const CONTRACT_ADDRESS:string="0xBf17E7a45908F789707cb3d0EBb892647d798b99";
const COUNTER_CONTRACT_ABI = ["function increment() external",
"function counter() public view returns(uint256)"];

function App() {
  // web3auth login
  const [gelatoLogin, setGelatoLogin] = useState<
    GaslessOnboarding | undefined
  >();
  // loading or not
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // provider for web3auth
  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider | null>(null);
  // user logged in through web3auth
  const [user, setUser] = useState<Partial<UserInfo> | null>(null);
  // initialized or not
  const [isInit, setIsInit] = useState<boolean>(false);
  // provider obtained from web3Authprovider
  const [provider, setProvider] = useState<SafeEventEmitterProvider|null>(null);
  // details of gaslessWallet
  const [gaslessWallet, setGaslessWallet] = useState<GaslessWalletInterface | null>(null);
  //wallet details
  const [wallet, setWallet] = useState<{address: string;balance: string;chainId: number;} | null>(null);
  // is gasless wallet deployed?
  const [isDeployed, setIsDeployed] = useState<boolean>(false);

  useEffect(() => {
    //function checking if logged in or not
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
    await getGaslessWallet();
  };

  const logout = async () => {
    if (!gelatoLogin) {
      return;
    }
    await gelatoLogin.logout();
    console.log("logging out...")
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
    console.log(_gasslessWallet.getAddress());
    console.log("GASLESSWALLET INITIATED:" + _gasslessWallet.isInitiated());
  }

  const counter = async()=>{
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      COUNTER_CONTRACT_ABI,
      new ethers.providers.Web3Provider(web3AuthProvider!).getSigner(),
    );
    let counterValue = await contract.counter();
    alert(counterValue.toString());
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
      if(!gelatoSmartWallet){
        alert("smart wallet not initiated");
      }else{
        const { taskId } = await gelatoLogin!.getGaslessWallet().sponsorTransaction(
          "0xBf17E7a45908F789707cb3d0EBb892647d798b99",
          data!
          );
          alert("https://relay.gelato.digital/tasks/status/"+taskId);
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
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>Gassless Wallet Address : {wallet?.address}</p>
      <button onClick={counter}>counter</button>
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
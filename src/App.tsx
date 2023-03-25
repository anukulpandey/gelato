import { useEffect, useState } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { ethers } from "ethers";
import {GaslessOnboarding,GaslessWalletConfig,GaslessWalletInterface,LoginConfig,} from "@gelatonetwork/gasless-onboarding";
import "./App.css"; //import this for tailwind css
import Navbar from "./components/Nav";
import Main from "./components/Main";
import Card from "./components/Card";
import {determineWinner} from './utils/determineWinner';
import {initialized} from './utils/initialized';
import {getGaslessWallet} from './utils/getGaslessWallet';
import abi from "./constants/contractAbi.json";
import { mintNFT } from "./utils/mintNFT";

const CONTRACT_ADDRESS:string="0x898806EC230F47B2e9D7eAf937C3c86E70030B22";
const COUNTER_CONTRACT_ABI = abi;

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
  const [stopped, setStop] = useState(false);
  const [connectText,setConnectText] = useState("Connect");

  const [player1, setPlayer1] = useState('bluesword');
  const [player2, setPlayer2] = useState('');
  const [playerCharacters,setPlayerCharacters] = useState([]);

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


  const login = async () => {
    setConnectText("Start Game")
    if (!isInit) {
      initialized(setIsLoading,setGelatoLogin,setWeb3AuthProvider,provider,getGaslessWallet);
      setIsInit(true);
    }
    if (!gelatoLogin) {
      return;
    }
    setConnectText("Connecting...")
    const web3authProvider = await gelatoLogin.login();
    setWeb3AuthProvider(web3authProvider);
    await getGaslessWallet(gelatoLogin,setGaslessWallet);
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

  

  const loggedInView = isLoading ? (
    <p className="text-white">loading...</p>
  ) : (
    <div>
      <div>
      <div className="flex justify-evenly my-10">
      <div>
       <p className="border-b-2 my-2 border-gray-600 text-white"> Player-1 <span className="font-xbody uppercase text-l text-gray-400">[ {user?.name} ]</span> </p>
      <Card isComp={false} isStopped={stopped} playerDetails={{"player":player1,"setFunc":setPlayer1,"playerCharacters":playerCharacters}} />
        </div>
        <div>
          
     <p className="border-b-2 my-2 border-gray-600 text-white">Player-2 <span className="font-xbody uppercase text-xl text-gray-400">[ Comp ]</span> </p>
      <Card isComp={true}  isStopped={stopped} playerDetails={{"player":player2,"setFunc":setPlayer2}}  />
        </div>
        </div>
        <button onClick={()=>mintNFT(CONTRACT_ADDRESS,COUNTER_CONTRACT_ABI,web3AuthProvider!)}>MINT</button>
        <button onClick={()=>{determineWinner(player1,player2,setStop)}} className="py-2 px-3 border-dashed border-gray-400 border-2 text-white text-xs">Select</button>

      </div>
      <p>Yo! You have logged in</p>
      <p>{user?.email}</p>
      <p>Gassless Wallet Address : {wallet?.address}</p>
      <p>Gassless Wallet Address : {gaslessWallet?.getAddress()}</p>
    </div>
  );

  const toLoginInView = (
    <div>
      <div className="font-xbody flex justify-center h-max justify-self-center items-center flex-col">
      <h2 className="text-white font-bold text-3xl underline">Gelato Gasless Warriors</h2>
        <Main/>
        <button onClick={login} className="py-2 px-4 border-dashed border-gray-400 border-4  tracking-widest text-white">{connectText}</button>
        <br />
        <p className="text-white">Login to play the game</p>
      </div>
    </div>
  );

  return (
    <>
    <Navbar/>
      <div >
        {web3AuthProvider ? loggedInView : toLoginInView}
      </div>
    </>
  );
}

export default App;

// reference : https://www.gelato.network/blog/how-to-use-gelato-s-gasless-wallet-sdk#social-login
import { useEffect, useState } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { ethers } from "ethers";
import {GaslessOnboarding,GaslessWalletConfig,GaslessWalletInterface,LoginConfig,} from "@gelatonetwork/gasless-onboarding";
import "./App.css"; 
import Navbar from "./components/Nav";
import Main from "./components/Main";
import Won from "./components/Won";
import Lost from "./components/Lost";
import Card from "./components/Card";
import Select from "./components/Select.jsx";
import SingleCard from "./components/SingleCard";
import {determineWinner} from './utils/determineWinner';
import {initialized} from './utils/initialized';
import {getGaslessWallet} from './utils/getGaslessWallet';
import abi from "./constants/contractAbi.json";
import { mintNFT } from "./utils/mintNFT";
import { getOwnedTokens } from "./utils/getOwnedTokens";
import { burnNFT } from "./utils/burn";
import AddressCard from "./components/AddressCard";
import LogoutButton from "./components/Logout";
import MyHeader from "./components/MyHeader";


const CONTRACT_ADDRESS:string="0xA6D803e01a2e1920E49001738d0c29e7d35EA235";
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

  const [player1, setPlayer1] = useState('none');
  const [player2, setPlayer2] = useState('');
  const [player1Chars,setPlayer1Chars] = useState([]);
  const [tokenIds,setTokenIds] = useState([]);
  const [displayOfBtn,setDisplayOfBtn] = useState(true);

  //if this is true then Won will be displayed or else Lose
  const [areYouWinningSon,setAreYouWinningSon] = useState('false');
  //if this is true then i will show the win or lose animaation 
  const [transactionInProgress,setTransactionInProgress] = useState(false);

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
      refresh();
    };
    init();
  }, [web3AuthProvider]);

  const mint=()=>{
    console.log(player2);
    mintNFT(CONTRACT_ADDRESS,COUNTER_CONTRACT_ABI,web3AuthProvider!,player2);
  }

  const burn=()=>{
    burnNFT(CONTRACT_ADDRESS,COUNTER_CONTRACT_ABI,web3AuthProvider!,player1Chars,tokenIds,player1);
  }

  const login = async () => {
  if (!isInit) {
    setDisplayOfBtn(false);
    setIsLoading(true);
    await initialized(setIsLoading, setGelatoLogin, setWeb3AuthProvider, provider, getGaslessWallet);
    setIsInit(true);
    setIsLoading(false);
  }
  setDisplayOfBtn(true);
  // if (!gelatoLogin) {
  //   return;
  // }
  setConnectText("Start Game");
  const web3authProvider = await gelatoLogin!.login();
  setWeb3AuthProvider(web3authProvider);
  await getGaslessWallet(gelatoLogin, setGaslessWallet);
  getOwnedTokens(CONTRACT_ADDRESS, COUNTER_CONTRACT_ABI, web3AuthProvider!, gaslessWallet?.getAddress()!, setPlayer1Chars, setTokenIds, setPlayer1);
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

  const refresh = ()=>{
    getOwnedTokens(CONTRACT_ADDRESS,COUNTER_CONTRACT_ABI,web3AuthProvider!,gaslessWallet?.getAddress()!,setPlayer1Chars,setTokenIds,setPlayer1)
  }
  
  const closeButton=(
      <button className="text-white" onClick={()=>{
        setStop(false);
        setTransactionInProgress(false);
        refresh();
      }}>Close</button>
    );

  const loggedInView = isLoading ? (
    <p className="text-white">loading...</p>
  ) : (
    <div>
      {!transactionInProgress?
      <div>
      <div className="flex justify-evenly my-10">
      <div>
       <p className="border-b-2 my-2 border-gray-600 text-white"> Player-1 <span className="font-xbody uppercase text-l text-gray-400">[ {user?.name} ]</span> <button onClick={()=>refresh()}>🔄</button> </p>
      <Card isComp={false} playerChars = {player1Chars} isStopped={stopped} playerDetails={{"player":player1,"setFunc":setPlayer1}} />
        </div>
        <div>
     <p className="border-b-2 my-2 border-gray-600 text-white">Player-2 <span className="font-xbody uppercase text-xl text-gray-400">[ Comp ]</span> </p>
      <Card playerChars = {player1Chars} isComp={true} isStopped={stopped} playerDetails={{"player":player2,"setFunc":setPlayer2}}  />
        </div>
        </div>
       {player1=="none"?<p className="text-white">
        You need to refresh your characters by pressing <button onClick={()=>refresh()}>🔄</button>
       </p>: <button onClick={()=>{determineWinner(player1,player2,setStop,mint,burn,setTransactionInProgress,setAreYouWinningSon)}} className="py-2 px-3 border-dashed border-gray-400 border-2 text-white text-xs">Fight</button> }
       <div className="flex flex-row">
  <div className="flex justify-start px-10">
    <AddressCard walletAddress={`${gaslessWallet?.getAddress()}`} name={`${user?.name}`} email={`${user?.email}`}/>
  </div>
  <div className="flex justify-end ml-auto px-4">
    <LogoutButton onPressed={logout}/>
  </div>
</div>
      </div>:
      
      areYouWinningSon?<div className="flex justify-evenly items-center px-24">
      <Won />
      <div className="w-1/2">
        <p className="text-white">
          You won so here is your {player2}
        </p>
        <br />
        {closeButton}
      </div>
      <SingleCard src={`/char/${player2}.gif`} charName={player2} />
    </div>
    
     : <div className="flex justify-evenly items-center px-24">
      <Lost />
      <div className="w-1/2">
        <p className="text-white">
          Sad to see {player1} go!
        </p>
        <br />
        {closeButton}
      </div>
      <SingleCard src={`/char/${player2}.gif`} charName={player2} burn={true}/>
    </div>
    }
      {/* // <p>{user?.email}</p>
      // <p>Gassless Wallet Address : {wallet?.address}</p> */}
    </div>
  );

  const toLoginInView = (
    <div>
      <div className="font-xbody flex justify-center h-max justify-self-center items-center flex-col">
       <MyHeader/>
        <Main/>
        {displayOfBtn && (
        <button onClick={login} className="py-2 px-4 border-dashed border-gray-400 border-4  tracking-widest text-white">{connectText}</button>
        )}
        {!displayOfBtn && (
       <div>
        <p className="text-white text-xl">Loading ... </p>
       </div>
        )}

        <br />
        <p className="text-white">Login to play the game</p>
      </div>
    </div>
  );

  const isFirstLogin = (
    <div>
      <div className="font-xbody flex justify-center h-max justify-self-center items-center flex-col">
      <h2 className="text-white font-bold text-4xl underline">Gelato Gasless Warriors</h2>
      <br />
        <p className="text-white text-2xl">Welcome!</p>
        <p className="text-white text-2xl">This is a game in which you can get NFTs for free as long as you are a good player - or else you can buy some too</p>
        <p className="text-white text-2xl">As a welcome gift we are giving you 3️⃣🆓 NFTs which you can check at Opensea as well</p>
        <p className="text-white text-2xl">You can use these to fight with our inbuilt AI to win more NFTs or sell them on Opensea</p>
        <Select contractDetails ={{CONTRACT_ADDRESS,COUNTER_CONTRACT_ABI,web3AuthProvider}} address = {gaslessWallet?.getAddress()} setPlayer1Chars={setPlayer1Chars} setIsDeployed={setIsDeployed}/>
      </div>
    </div>
  );

  return (
    <>
    <Navbar/>
      <div >
       {/* prod  */}
        {web3AuthProvider && isDeployed ?  loggedInView : web3AuthProvider? isFirstLogin :toLoginInView}
       
        {/* testing
        {web3AuthProvider && isDeployed ?  isFirstLogin : web3AuthProvider? isFirstLogin :toLoginInView} */}
      </div>
    </>
  );
}

export default App;

// reference : https://www.gelato.network/blog/how-to-use-gelato-s-gasless-wallet-sdk#social-login
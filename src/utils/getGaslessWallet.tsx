import { GaslessWalletInterface } from "@gelatonetwork/gasless-onboarding";

export const getGaslessWallet = async (gelatoLogin:any,setGaslessWallet:any) => {
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
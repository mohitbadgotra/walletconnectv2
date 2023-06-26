"use client";

import { EthereumProvider } from "@walletconnect/ethereum-provider";
import Web3 from "web3";

const Home = () => {
  console.log(
    "process.env.NEXT_PUBLIC_PROJECT_ID",
    process.env.NEXT_PUBLIC_PROJECT_ID
  );
  const handleWalletConnect = async () => {
    if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
      throw new Error(
        "You need to provide NEXT_PUBLIC_PROJECT_ID env variable"
      );
    } else {
      const client = await EthereumProvider.init({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        showQrModal: true,
        chains: [97],
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["chainChanged", "accountsChanged"],
      });
      await client.connect();
      const web3 = new Web3(client);
      const connectedChainId = await web3.eth.getChainId();
      console.log("connectedChainId", connectedChainId);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          handleWalletConnect();
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};
export default Home;

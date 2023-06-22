// Import CSS styles, and necessary modules from packages
// import styles from "../styles/NftMinter.module.css";
import { useState } from "react";
import { Contract } from "alchemy-sdk";
import { useAccount, useSigner } from "wagmi";

// NFT Minter component
export default function NftMinter({ contractAddress, tokenUri, abi }) {
  // Get the user's wallet address and status of their connection to it
  const { address, isDisconnected } = useAccount();
  // Get the signer instance for the connected wallet
  const { data: signer } = useSigner();
  // State hooks to track the transaction hash and whether or not the NFT is being minted
  const [txHash, setTxHash] = useState();
  const [isMinting, setIsMinting] = useState(false);

  // Function to mint a new NFT
  const mintNFT = async () => {
    console.log(tokenUri, contractAddress, address);
    // Create a new instance of the NFT contract using the contract address and ABI
    const nftContract = new Contract(contractAddress, abi, signer);
    try {
      // Set isMinting to true to show that the transaction is being processed
      setIsMinting(true);
      // Call the smart contract function to mint a new NFT with the provided token URI and the user's address
      const mintTx = await nftContract.mintNFT(address, tokenUri);
      // Set the transaction hash in state to display in the UI
      setTxHash(mintTx?.hash);
      // Wait for the transaction to be processed
      await mintTx.wait();
      // Reset isMinting and txHash in state
      setIsMinting(false);
      setTxHash(null);
    } catch (e) {
      // If an error occurs, log it to the console and reset isMinting to false
      console.log(e);
      setIsMinting(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20 align-middle mx-30 h-screen">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg self-center mx-auto">
        <div className="relative "></div>

        <div className="p-6 justify-center">
          <h1 className="text-2xl text-stone-800 font-bold mb-2">Mint an NFT</h1>
          <h3 className="text-gray-600 mb-4">Speedrun Ethereum</h3>
          <p className="text-gray-700 mb-4">
            This tab allows you to mint a simple NFT as proof of knowledge for Scaffold-Eth-2 as part of Raid Guilds
            latest season.
          </p>
          <hr className="my-4" />
          <h3 className="text-xl text-stone-800 font-bold mb-2">INSTRUCTIONS</h3>
          <p className="text-gray-700 mb-4">
            This NFT is on Goerli Network. You’ll need some test ETH to mint the
            <a href="https://goerlifaucet.com/">
              <strong>Get free test ETH</strong>
            </a>
          </p>
          {isDisconnected ? (
            <p>Connect your wallet to get started</p>
          ) : !txHash ? (
            <button
              className={`w-full px-4 py-2 bg-base-100 text-white rounded-md transition-colors ${
                isMinting ? "cursor-wait" : "hover:bg-base-300"
              }`}
              disabled={isMinting}
              onClick={async () => await mintNFT()}
            >
              {isMinting ? "Minting" : "Mint Now"}
            </button>
          ) : (
            <div>
              <h3 className=" font-semibold text-base-300 text-sm mb-1">TX ADDRESS</h3>
              <a
                className=" text-blue-700 font-bold"
                href={`https://goerli.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex align-middle gap-2">
                  <div>
                    {txHash.slice(0, 6)}...{txHash.slice(6, 10)}
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

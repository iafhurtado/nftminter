import contract from "../components/mintnft/myNFTABI.json";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import NftMinter from "~~/components/mintnft/nftMinter";

const MintNFT: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Mint an NFT | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid flex-grow" data-theme="mintNft">
        <NftMinter
          contractAddress={"0x73F71a52274cC0D53bf67Aef0Bf34942d77A40cE"}
          tokenUri={"https://ipfs.io/ipfs/QmXmKy7QcQwX5CFamWsR91eNkb7auGhbPLGrk3t1Mgfbw9?filename=Analytical.JPG"}
          abi={contract.abi}
        />
      </div>
    </>
  );
};

export default MintNFT;

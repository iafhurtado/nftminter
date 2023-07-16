import contract from "../components/mintnft/StandardNFT.json";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import NftMinter from "~~/components/mintnft/nftMinter";
import { MinterData } from "~~/components/mintnft/MinterData";


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
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="mintNft">
        <NftMinter
          contractAddress={"0x02296920692125f9a5764145bBAf5dBD2F307455"}
          tokenUri={
            "https://ipfs.io/ipfs/QmRXNNHSrfBVcyqSce4S6bpypR6ehLvTo96w1rY6TMgNZ4?filename=dalle%20coffee%202.png"
          }
          abi={contract.abi}
        />
        <MinterData />
      </div>
    </>
  );
};

export default MintNFT;

import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import config from "../mintnft/contractConfig.json";



export const MinterData = () => {
  const { data: tokenURI } = useContractRead({
    address: "0x02296920692125f9a5764145bBAf5dBD2F307455",
    abi: config.abi,
    functionName: "tokenURI",
    args: ["0"],
  });

  const { data: totalSupply } = useContractRead({
    address: "0x02296920692125f9a5764145bBAf5dBD2F307455",
    abi: config.abi,
    functionName: "totalSupply",
    args: [],
  });

  const [imageHash, setImageHash] = useState("");
  const [contractTotalSupply, setContractTotalSupply] = useState(0);

  useEffect(() => {
    if (tokenURI) {
      fetch(tokenURI as RequestInfo)
        .then(res => res.blob()) // Use res.blob() to get the image data as a Blob
        .then(blob => {
          const imageURL = URL.createObjectURL(blob); // Create a temporary URL for the image data
          setImageHash(imageURL);
        })
        .catch(error => {
          console.error("Error fetching tokenURI:", error);
        });
    }
  }, [tokenURI]);

  useEffect(() => {
    if (totalSupply !== undefined) {
      const supply = Number(totalSupply);
      if (!isNaN(supply)) {
        setContractTotalSupply(supply);
      }
    }
  }, [totalSupply]);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg self-center mx-auto">
        <div className="p-6 justify-center">
          <h1 className="text-2xl text-stone-800 font-bold mb-2">Ivan x Dall.e</h1>
          <h3 className="text-gray-600 mb-4">Prompt:</h3>
          <p className="text-gray-700 mb-4">“an expressive oil painting of someone drinking a coffee in Paris”</p>
          <div className="flex flex-shrink w-80">{imageHash && <img src={imageHash} alt="Token Image" />} {/* Display the image if imageHash is available */}</div>
          <div className=" text-black">Total Supply: {contractTotalSupply}</div>
        </div>
    </div>
  </div>
  );
};

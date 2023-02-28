import React, { useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddressess } from "@/constants";

const LotteryEntrance = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = Number(chainIdHex);
  const raffleAddress =
    chainId in contractAddressess ? contractAddressess[chainId] : null;

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: "",
    msgValue: "",
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: "",
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const entranceFeeFromContract = await getEntranceFee();
        console.log(entranceFeeFromContract);
      }
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      <h3>LotteryEntrance</h3>
    </div>
  );
};

export default LotteryEntrance;

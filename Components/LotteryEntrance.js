import React, { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddressess } from "@/constants";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
  const dispatch = useNotification();
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const chainId = Number(chainIdHex);
  const raffleAddress =
    chainId in contractAddressess ? contractAddressess[chainId][0] : null;

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: "",
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: "",
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: "",
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: "",
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        try {
          const entranceFeeFromContract = await getEntranceFee();
          const numPlayers = await getNumberOfPlayers();
          const recentWinner = await getRecentWinner();
          setEntranceFee(entranceFeeFromContract.toString());
          setNumPlayers(numPlayers.toString());
          setRecentWinner(recentWinner);
          console.log(recentWinner);
        } catch (error) {
          console.log(error);
        }
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleEnterRaffle = async () => {
    await enterRaffle({
      onSuccess: handleComplete,
    });
  };

  const handleComplete = async (tx) => {
    await tx.wait(1);
    handleNotification(tx);
  };

  const handleNotification = (tx) => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  return (
    <div>
      <h3>LotteryEntrance</h3>
      {raffleAddress ? (
        <div>
          <p>Entrance Fee : {ethers.utils.formatUnits(entranceFee)} ETH</p>
          <p>Players : {numPlayers}</p>
          <p>Recent Player : {recentWinner}</p>
          <button className="btn" onClick={handleEnterRaffle}>
            Enter Raffle
          </button>
        </div>
      ) : (
        <p>No Raffle Address Detected</p>
      )}
    </div>
  );
};

export default LotteryEntrance;

import React, { Fragment } from "react";
import Head from "next/head";
import Navbar from "@/Components/Navbar";
import LotteryEntrance from "@/Components/LotteryEntrance";

const Home = () => {
  return (
    <div className="container m-auto">
      <Head>
        <title>Next Lottery App</title>
        <meta name="description" content="Next lottery application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <LotteryEntrance />
    </div>
  );
};

export default Home;

// import React, { useEffect } from "react";
// import { useMoralis } from "react-moralis";

// const Navbar = () => {
//   const {
//     enableWeb3,
//     account,
//     isWeb3Enabled,
//     deactivateWeb3,
//     Moralis,
//     isWeb3EnableLoading,
//   } = useMoralis();

//   const handleConnect = async () => {
//     await enableWeb3();
//     if (typeof window != "undefined") {
//       localStorage.setItem("connected", "injected");
//     }
//   };

//   useEffect(() => {
//     if (isWeb3Enabled) return;
//     if (localStorage.getItem("connected")) {
//       enableWeb3();
//     }
//   }, [isWeb3Enabled]);

//   useEffect(() => {
//     Moralis.onAccountChanged((acc) => {
//       console.log(`Account changed to ${acc}`);
//       if (acc == null) {
//         localStorage.removeItem("connected");
//         deactivateWeb3();
//         console.log("Null Account found");
//       }
//     });
//   }, []);

//   return (
//     <div
//       className={"w-full h-full p-4 navbar bg-gray-600 justify-between gap-4 "}
//     >
//       <a className="btn btn-ghost normal-case text-xl">lottery App</a>
//       {account ? (
//         <p className="text-lg normal-case">
//           Connected to :{" "}
//           {`${account?.slice(0, 6)}...${account?.slice(account?.length - 4)}`}
//         </p>
//       ) : (
//         <button
//           className="btn"
//           onClick={handleConnect}
//           disabled={isWeb3EnableLoading}
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { ConnectButton } from "web3uikit";

const Navbar = () => {
  return (
    <div>
      <ConnectButton moralisAuth={false} />
    </div>
  );
};

export default Navbar;

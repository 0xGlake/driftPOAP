import styles from "../styles/Home.module.css";
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const MintNFTs = ({ onClusterChange }) => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);

  const [disableMint, setDisableMint] = useState(true);

  const candyMachineAddress = new PublicKey(
    process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  );
  let candyMachine;
  let walletBalance;

  const refreshStatus = async () => {
    candyMachine = await metaplex
      .candyMachines()
      .findByAddress({ address: candyMachineAddress });

    //wallet connected?
    if (!wallet.connected) {
      setDisableMint(true);
      return;
    }

    //enough items available?
    if (
      candyMachine.itemsMinted.toString(10) -
      candyMachine.itemsAvailable.toString(10) >
      0
    ) {
      console.error("not enough items available");
      setDisableMint(true);
      return;
    }

    //good to go!
    setDisableMint(false);
  };

  if (!wallet.connected) {
    return null;
  } else {
    refreshStatus();
  }

  const onClick = async () => {
    try {
      const { nft } = await metaplex.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: candyMachine.authorityAddress,
      });
      
      toast.info("Attempting to mint, please wait", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      
      setNft(nft);
      toast.success("Mint success", {
      position: toast.POSITION.BOTTOM_LEFT
    });

  } catch (err){
    toast.error("Error: " + err.toString(), {
      position: toast.POSITION.BOTTOM_LEFT
    });
  }
};

  return (
    <div>
      <div>
        <div className={styles.container}>
            <div className={styles.nftPreview}>
              <img className={styles.nftImage}
                src={"/POAP.png"}
                alt="The downloaded illustration of the provided NFT address."
              />
              <div className={styles.nftForm}>
                <button onClick={onClick} disabled={disableMint}>
                  MINT NFT!
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

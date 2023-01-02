import { ConnectWallet, useAddress, useBurnNFT, useContract, useContractEvents, useNFTBalance, useNFTDrop, useNFTs, useOwnedNFTs } from "@thirdweb-dev/react";
import { useEffect } from "react";
import AirtableTest from "../components/airtableTest";
import styles from "../styles/Home.module.css";
import myABI from "../abi.json";
import Airtable from "airtable";

export default function Home() {


  const address = useAddress();
  //Arkadia OGs
  // const { contract } = useContract('0x06ba631541b8FF2a6E8208b5C0d5F4c47ba2567e');
  // haxy rabbit
  // const { contract } = useContract('0x0125A4Ae30cA97B60457d424E002B1270EDDBDdd');

  //HaxRabito
  const { contract } = useContract('0x830A0C890A1F969586612b1FD98480e9406941f4');


  //Arkadia Ogs
  // const { contract } = useContract('0x06ba631541b8FF2a6E8208b5C0d5F4c47ba2567e');
  // const { contract, isLoadingContacr, errorContract } = useContract("0x06ba631541b8FF2a6E8208b5C0d5F4c47ba2567e", myABI);

  const { data: nfts, isLoading3, error3 } = useNFTs(contract, { start: 0, count: 100 });
  const { data: ownerBalance, isLoading2, error2 } = useNFTBalance(contract, address);
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  // console.log('Owned ', ownedNFTs);
  // console.log('balance ', ownerBalance);
  // console.log('NFTS ', nfts);

  const nftDrop = useNFTDrop('0x830A0C890A1F969586612b1FD98480e9406941f4');

  const {
    mutate: burnNft,
    isLoading: isBurning,
    error: isBurningError,
  } = useBurnNFT(nftDrop);

  if (isBurningError) {
    console.error("failed to burn nft", isBurningError);
  }


  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keyJfhBJq0Uru82AA' }).base('appz9X0qSweYkCBVX');


  // add user address as white listed
  const addFiled = (userAddress) => {
    console.log(userAddress);
    base('Mint Table Test2').create([
      {
        "fields": {
          "Addresses": userAddress,
          "Minted": "Yes"
        }
      }
    ], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
  }


  useEffect(() => {
    contract?.events.addTransactionListener((event) => {
      console.log('C_Evnts ', event);
      if (event.status == "completed") {
        console.log(' Burned and user address whitelisted');
        addFiled(address)
      }
    })
  }, [isBurning]);



  console.log('Burn State', isBurning);
  // console.log('Burn Error', isBurningError);

  // useEffect(() => {
  // }, [address]);



  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome  <a href="https://thirdweb.com/">{address}</a>!
        </h1>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <p>{ownedNFTs?.length} items</p>
        <p>{isLoading ? 'Loading...' : ''}</p>
        <div className="nf-grid">
          {
            ownedNFTs &&
            ownedNFTs.map((item, i) => (
              <div className="nf-item" key={i}>
                <img src={item.metadata.image} alt="" />
                <p>{item.metadata.name}</p>
                <label>{item.metadata.id}</label>
                <br />
                <button
                  disabled={isBurning}
                  onClick={() => burnNft({ tokenId: parseInt(item.metadata.id) })}
                >
                  Burn
                </button>
              </div>
            ))
          }
        </div>
        {
          isBurning ?
            <div className="burn-pop">
              <span>
                Burning...
              </span>
            </div> : ''
        }


        <div className={styles.grid}>
          {/* <AirtableTest address={address} /> */}
        </div>
      </main>
    </div>
  );
}

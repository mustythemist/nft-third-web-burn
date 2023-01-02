import Airtable from "airtable";
import { useEffect, useState } from "react";

const AirtableTest = ({ address }) => {
  const [userAddress, setuserAddress] = useState(address);

  // Airtable.configure({ apiKey: 'patBWZoQ5CtReZzTB.ec139423701370dedc40994a79caa17edb68608a027afac8d52a341ec9313238' })
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keyJfhBJq0Uru82AA' }).base('appz9X0qSweYkCBVX');


  useEffect(() => {

    base('Mint Table Test2').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        // console.log('Retrieved', record.get('Addresses'));
        // console.log('Retrieved', record.get('Minted'));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }, []);

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



  return (
    <div>
      <h2>Table Test</h2>

      {/* <input type="text" onChange={(e) => setuserAddress(e.target.value)} /> */}
      <button onClick={() => addFiled(address)}>Submit</button>
      <button onClick={() => console.log(process.env.AIR_TABLE_KEY)}>ASD</button>

    </div>
  );
}

export default AirtableTest;
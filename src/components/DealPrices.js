import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSteam } from 'react-icons/fa';

export const DealPrices = (props) => {
  const { sale, retail, cheapest, cheapestDate, storeID, ratingText, ratingPercent } = props;
  const [store, setStore] = useState([]);

  // Convert historical low
  const milliseconds = cheapestDate * 1000;
  const dateObj = new Date(milliseconds);
  const dateFormat = dateObj.toLocaleString("en-US", {day: "numeric", month: "short", year: "numeric"});

  useEffect(() => {
    // Get store name
    const fetchStore = async () => {
      await axios.get('https://www.cheapshark.com/api/1.0/stores?')
        .then(response =>  { 
          let storeObj = response.data.find(store => store.storeID === storeID);
          setStore(storeObj.storeName);
        })
        .catch(err => console.log(err))
    }

    fetchStore();
  })

  return (
    <div className="deal-prices">
      <h1>Price ({store})</h1>
      <h3>Sale:</h3>
      <h2>${sale}</h2>
      <h3>Retail:</h3>
      <h2>${retail}</h2>
      <h3>Historical Low:</h3>
      {cheapest ? <h2>${cheapest} ({dateFormat})</h2> : <h2>Not found.</h2>}
      <hr/>
      <h1 className="steam-rating"><FaSteam className="steam-icon" size="29px"/>Steam Rating</h1>
      {
        // Render steam rating (if it has one)
        ratingText ? 
        <>
        <h3>{ratingText}</h3>
        <progress value={ratingPercent} max="100" /><span> {ratingPercent} %</span>
        </> : 
        <h2>Not Found</h2>
      }
    </div>
  )
}

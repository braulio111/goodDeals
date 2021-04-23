import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const DealCard = (props) => {
  const { dealID, steamID, title, image, storeID, price, discount } = props;

  const [betterImage, setBetterImage] = useState([]);
  const [store, setStore] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      await axios.get(`https://thingproxy.freeboard.io/fetch/https://store.steampowered.com/api/appdetails?appids=${steamID}`)
        .then(response => setBetterImage(response.data[steamID].data.header_image))
        .catch(err => console.log(err))
    }

    const fetchStore = async () => {
      await axios.get('https://www.cheapshark.com/api/1.0/stores?')
        .then(response =>  { 
          let storeObj = response.data.find(store => store.storeID === storeID);
          setStore(storeObj.storeName);
        })
        .catch(err => console.log(err))
    }

    if (steamID) fetchImage();
    fetchStore();
  }, [steamID, storeID]);

  return (
    <Link to={`/deal/${dealID}`}>
    <div className="deal-card">
      <img src={steamID ? betterImage : image} className="game-image" alt="" />
        <div className="deal-info">
          <h4 className="deal-title">{title}</h4>
          <div className="deal-discount-price">
            <h4>${price}</h4>
            <h4 className="deal-discount">- {Math.ceil(discount).toFixed(0)}%</h4>
          </div>
          <h4 className="deal-store">{store}</h4>
      </div>
    </div>
    </Link>
  )
}

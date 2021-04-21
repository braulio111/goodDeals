import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DealHeader } from '../components/DealHeader';
import { DealPrices } from '../components/DealPrices';

export const DealScreen = (props) => {
  const [deal, setDeal] = useState({
    gameInfo: {
      name: ""
    },
    cheapestPrice: {
      price: 0
    }
  });
  const dealID = props.match.params.id;

  useEffect(() => {
    const fetchDeal = async () => {
      await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
        .then(response => setDeal(response.data))
        .catch(err => console.log(err))
    }

    fetchDeal();
  }, [dealID]);

  return (
    <>
      <DealHeader steamID={deal.gameInfo.steamAppID} title={deal.gameInfo.name} image={deal.gameInfo.thumb} />
      <DealPrices sale={deal.gameInfo.salePrice} retail={deal.gameInfo.retailPrice} cheapest={deal.cheapestPrice.price} cheapestDate={deal.cheapestPrice.date} storeID={deal.gameInfo.storeID}/>
    </>
  )
}

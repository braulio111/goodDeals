import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DealHeader } from '../components/DealHeader';
import { DealPrices } from '../components/DealPrices';
import Loader from 'react-loader-spinner';

export const DealScreen = (props) => {
  const [deal, setDeal] = useState({
    gameInfo: {
      name: "",
      ratingText: ""
    },
    cheapestPrice: {
      price: 0
    }
  });
  const [loading, setLoading] = useState(true);
  // Get deal ID through URL
  const dealID = props.match.params.id;

  useEffect(() => {
    const fetchDeal = async () => {
      await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
        .then(response => {
          setDeal(response.data);
          setLoading(false);
        })
        .catch(err => console.log(err))
    }

    fetchDeal();
  }, [dealID]);

  return (
    <>
    {
    loading ? <Loader type="Grid" color="#000" className="loading_icon"></Loader> :
    <>
      <DealHeader steamID={deal.gameInfo.steamAppID} title={deal.gameInfo.name} image={deal.gameInfo.thumb} />
      <DealPrices sale={deal.gameInfo.salePrice} retail={deal.gameInfo.retailPrice} cheapest={deal.cheapestPrice.price} cheapestDate={deal.cheapestPrice.date} storeID={deal.gameInfo.storeID} ratingText={deal.gameInfo.steamRatingText} ratingPercent={deal.gameInfo.steamRatingPercent}/>
      <h4>In Progress...</h4>
    </>
    }
    </>
  )
}

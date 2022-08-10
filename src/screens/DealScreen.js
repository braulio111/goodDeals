import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { DealPrices } from "../components/DealPrices";

export const DealScreen = (props) => {
  const [deal, setDeal] = useState({});
  const [loading, setLoading] = useState(true);
  // Get deal ID through URL
  const dealID = props.match.params.id;

  useEffect(() => {
    const fetchDeal = async () => {
      await axios
        .get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
        .then((response) => {
          setDeal(response.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchDeal();
  }, [dealID]);

  return (
    <>
      {loading ? (
        <Loader type="Grid" color="#000" className="loading_icon"></Loader>
      ) : (
        <>
          <img src={deal.gameInfo.thumb} className="game-solo-image" alt="" />
          <h1 className="game-solo-title">BUY: {deal.gameInfo?.name}</h1>
          <DealPrices
            sale={deal.gameInfo.salePrice}
            retail={deal.gameInfo.retailPrice}
            cheapest={deal.cheapestPrice?.price}
            cheapestDate={deal.cheapestPrice.date}
            storeID={deal.gameInfo.storeID}
            ratingText={deal.gameInfo?.steamRatingText}
            ratingPercent={deal.gameInfo.steamRatingPercent}
          />
          <h4>In Progress...</h4>
        </>
      )}
    </>
  );
};

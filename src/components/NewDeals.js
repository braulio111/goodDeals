import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DealCard } from './DealCard';

export const NewDeals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      await axios.get('https://www.cheapshark.com/api/1.0/deals?sortBy=recent&pageSize=8')
        .then(response => setDeals(response.data))
        .catch(err => console.log(err))
    }

    fetchDeals();
  }, [])

  return (
    <div className="best-deals">
      <div className="best-deals-label">
        <h1>New Deals</h1>
        <a href="/best-deals">View all</a>
      </div>
      <div className="deal-cards-wrap">
        {
          deals.map(deal => {
            return(
              <DealCard key={deal.dealID} dealID={deal.dealID} steamID={deal.steamAppID} title={deal.title} image={deal.thumb} storeID={deal.storeID} price={deal.salePrice} discount={deal.savings} />
            );
          })
        }
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DealCard } from '../components/DealCard';

export const SearchScreen = (props) => {
  const searchQuery = props.match.params.game;

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Búsqueda en base al nombre del juego en la URL
    const fetchDeals = async () => {
      await axios.get(`https://www.cheapshark.com/api/1.0/deals?title=${searchQuery}&pageSize=12`)
        .then(response => setDeals(response.data))
        .catch(err => console.log(err))
    }

    fetchDeals();
  }, [searchQuery])

  return (
    <>
    <h1 className="search-label">Search for: {searchQuery}</h1>
    <div className="search-deals">
      <div className="deal-cards-wrap">
        {
          deals.map(deal => {
            return(
              <DealCard key={deal.dealID} deal={deal} />
            );
          })
        }
      </div>
    </div>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FeaturedDeal } from '../components/FeaturedDeal';
import { BestDeals } from '../components/BestDeals';
import { SteamDeals } from '../components/SteamDeals';
import { NewDeals } from '../components/NewDeals';

export const HomeScreen = () => {
  const [featuredDeal, setFeaturedDeal] = useState([{
    title: ""
  }]);

  useEffect(() => {
    const fetchFeatured = async () => {
      await axios.get('https://www.cheapshark.com/api/1.0/deals?pageSize=1')
        .then(response => setFeaturedDeal(response.data))
        .catch(err => console.log(err));
    }
    fetchFeatured();
  }, []);

  return (
    <>
      <FeaturedDeal title={featuredDeal[0].title} price={featuredDeal[0].salePrice} image={featuredDeal[0].thumb} dealID={featuredDeal[0].dealID}/>
      <BestDeals />
      <SteamDeals />
      <NewDeals />
    </>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FeaturedDeal } from '../components/FeaturedDeal';
import { BestDeals } from '../components/BestDeals';
import Loader from 'react-loader-spinner';
import { FaSteam } from 'react-icons/fa';

export const HomeScreen = () => {
  const [featuredDeal, setFeaturedDeal] = useState([{
    title: ""
  }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get featured deal
    const fetchFeatured = async () => {
      await axios.get('https://www.cheapshark.com/api/1.0/deals?pageSize=1')
        .then(response => {
          setFeaturedDeal(response.data);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
    fetchFeatured();
  }, []);

  return (
    <>
      {
      loading ? <Loader type="Grid" color="#000" className="loading_icon"></Loader> :
      <>
      <FeaturedDeal title={featuredDeal[0].title} price={featuredDeal[0].salePrice} image={featuredDeal[0].thumb} dealID={featuredDeal[0].dealID}/>
      <div className="best-deals">
        <div className="best-deals-label">
          <h1>Best Deals</h1>
          <a href="/best-deals">View all</a>
        </div>
        <BestDeals endpoint="/1.0/deals?pageSize=9" />
        <div className="best-deals-label">
          <div className="steam-deals">
            <FaSteam size="22px"/><span>Steam Deals</span>
          </div>
          <a href="/steam-deals">View all</a>
        </div>
        <BestDeals endpoint="/1.0/deals?storeID=1&pageSize=8" />
        <div className="best-deals-label">
          <h1>New Deals</h1>
          <a href="/best-deals">View all</a>
        </div>
        <BestDeals endpoint="/1.0/deals?sortBy=recent&pageSize=8"/>
      </div>
      </>
      }
    </>
  )
}

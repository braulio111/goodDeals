import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { DealCard } from "../components/DealCard";

export const SearchScreen = (props) => {
  const searchQuery = props.match.params.game;

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Search by game title on searchbar
    const fetchDeals = async () => {
      await axios
        .get(`https://www.cheapshark.com/api/1.0/deals`, {
          params: { title: searchQuery, pageSize: 12 },
        })
        .then((response) => {
          setDeals(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchDeals();
  }, [searchQuery]);

  return (
    <>
      <h1 className="search-label">Search for: {searchQuery}</h1>
      {loading ? (
        <Loader type="ThreeDots" color="#000" className="loading_icon"></Loader>
      ) : deals.length ? (
        <div className="search-deals">
          <div className="deal-cards-wrap">
            {deals.map((deal) => {
              return <DealCard key={deal.dealID} deal={deal} />;
            })}
          </div>
        </div>
      ) : (
        <h1 className="no-results">No results found.</h1>
      )}
    </>
  );
};

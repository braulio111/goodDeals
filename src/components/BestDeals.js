import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { DealCard } from "./DealCard";

export const BestDeals = ({ endpoint }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      await axios
        .get(`https://www.cheapshark.com/api${endpoint}`)
        .then((response) => {
          // Ignore first game deal since it is featured at the top
          endpoint === "/1.0/deals?pageSize=9"
            ? setDeals(response.data.slice(1, response.data.length))
            : setDeals(response.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchDeals();
  }, [endpoint]);

  return (
    <div className="best-deals">
      {loading ? (
        <Loader
          type="ThreeDots"
          color="#000"
          className="loading_icon-small"
        ></Loader>
      ) : (
        <div className="deal-cards-wrap">
          {deals.map((deal) => {
            return <DealCard key={deal.dealID} deal={deal} />;
          })}
        </div>
      )}
    </div>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DealCard = ({ deal }) => {
  const { dealID, title, thumb, storeID, salePrice, savings } = deal;
  const [store, setStore] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      await axios
        .get("https://www.cheapshark.com/api/1.0/stores?")
        .then((response) => {
          let storeObj = response.data.find(
            (store) => store.storeID === storeID
          );
          setStore(storeObj.storeName);
        })
        .catch((err) => console.log(err));
    };

    fetchStore();
  }, [storeID]);

  return (
    <Link to={`/deal/${dealID}`}>
      <div className="deal-card">
        <img src={thumb} className="game-image" alt="" />
        <div className="deal-info">
          <h4 className="deal-title">{title}</h4>
          <div className="deal-discount-price">
            <h4>${salePrice}</h4>
            <h4 className="deal-discount">
              - {Math.ceil(savings).toFixed(0)}%
            </h4>
          </div>
          <h4 className="deal-store">{store}</h4>
        </div>
      </div>
    </Link>
  );
};

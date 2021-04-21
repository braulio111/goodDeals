import React from 'react'

export const FeaturedDeal = (props) => {
  const  { title, price, image } = props;

  return (
    <>
      <h1 className="featured-h1">Featured Deal</h1>
      <div className="featured-deal" style={{backgroundImage: `url(${image})`}}>
        <div className="featured-deal-info" >
          <h2>{title}</h2>
          <h3>{price === "0.00" ? "Free" : `${price}`}</h3>
        </div>
      </div>
    </>
  )
}

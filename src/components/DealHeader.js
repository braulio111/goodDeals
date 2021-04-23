import React from 'react';

export const DealHeader = (props) => {
  const { title, image } = props;

  return (
    <>
      <img src={image} className="game-solo-image" alt="" />
      <h1 className="game-solo-title">BUY: {title}</h1>
    </>
  )
}

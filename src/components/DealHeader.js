import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DealHeader = (props) => {
  const { steamID, title, image } = props;
  const [gameInfo, setGameInfo] = useState({}); 
  
  useEffect(() => {
    const fetchImage = async () => {
      await axios.get(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails?appids=${steamID}`)
        .then(response => setGameInfo(response.data[steamID].data))
        .catch(err => console.log(err))
    }
    
    fetchImage();
  }, [steamID])

  return (
    <>
      <img src={steamID ? gameInfo.header_image : image} className="game-solo-image" alt="" />
      <h1 className="game-solo-title">BUY: {title}</h1>
    </>
  )
}

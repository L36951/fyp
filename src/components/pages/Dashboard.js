import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Card from '../Card';
import DasboardBox from '../DashboardBox';
import QRCode from 'qrcode';
import NotFound from './NotFound';
const Dasboard = () => {
  const { search } = useLocation();
  const { id } = queryString.parse(search);
  const [fishtype, setFishType] = useState();
  const [updatedAt, setUpdateAt] = useState();
  const [imageUrl, setImageUrl] = useState(id);
  const [qrcodeStyle, setQrcodeStyle] = useState({ display: "none" });
  const [error, setError] = useState(true);
  useEffect(() => {
    (async () => {
      let fishpondData;
      try {
        const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/period/query?periodid=${id}`);
        fishpondData = await response.json();

      } catch (error) {
        setError(true)
        fishpondData = [];
      }
      if (fishpondData.ok) {
        setFishType(fishpondData.data[0].fishtype.fishtype);
        setUpdateAt(fishpondData.data[0].updatedAt.split("T")[0]);
        setError(false)
      }
      else {
        setError(true)

      }


    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await QRCode.toDataURL(id);
        setImageUrl(res);
      } catch (error) {

      }
    })();
  }, [])

  const handleClick = () => {

    qrcodeStyle.display === "none" ? setQrcodeStyle({ display: "block" }) : setQrcodeStyle({ display: "none" })
  }
  if (!error) {
    return (

      <>
        
        <div className='wrapper'>
          {!error ?
            <Card
              img="https://images.unsplash.com/photo-1612077330269-788066d5ba58?crop=entropy/&cs=srgb/&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"
              title={id}
              description={fishtype}
              price={updatedAt}
              handleClick={handleClick}
            />
            : null}
          <div className='qrcode-contaniner' style={qrcodeStyle}>
            {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="qrcode" ></img></a>) : null}
          </div>
        </div>
        {!error ?
          <div className='cards-container'>
            <DasboardBox
              fishtankId={id}
            />
          </div>
          : null}


      </>

    );
  }
  else{
    return(
    <NotFound/>
    )
  }
}

export default Dasboard;
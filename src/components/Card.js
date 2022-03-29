import React from 'react';
import './Card.css';

function Card(props){
    return(
        <div className='card'>
            <img src={props.src} className='card__img'/>
            <div className='card__body'>
                <h2  className='card__title'>{props.title}</h2>
                <p className='card__description'>{props.description}</p>
                <h3 className='card__price'>{props.price}</h3>
                <button onClick={props.handleClick} className='card__btn'><i className="fas fa-qrcode"></i>  QRCode</button>
            </div>
        </div>
    )
}
export default Card;
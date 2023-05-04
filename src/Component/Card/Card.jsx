// eslint-disable-next-line no-unused-vars
import React from 'react';

import './Card.css';

const Card = ({title, image, desc}) => {

    return (
        <div className='card'>
            <img src={image} alt="image" />
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
    );
};

export default Card;
// eslint-disable-next-line no-unused-vars
import React from 'react';

import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({title, image, desc, link = "#"}) => {

    return (
        <Link to={link} className='card'>
            <img src={image} alt="image" />
            <h4>{title}</h4>
            <p>{desc}</p>
        </Link>
    );
};

export default Card;
// eslint-disable-next-line no-unused-vars
import React from 'react';

import './Avis.css';

const Avis = ({by, at, content}) => {

    return (
        <div className='avis'>
            <p className='metadata'>Par {by ?? 'Anonymous'} le {new Date(at).toLocaleString()} </p>
            <p>{content}</p>
        </div>
    );
};

export default Avis;
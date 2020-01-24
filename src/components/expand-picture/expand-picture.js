import React from 'react'
import './expand-picture.scss'

export const ExpandPicture = ({ imageResp }) => {
    const { results } = imageResp
    const randPicture = Math.floor(Math.random() * 9);
    const bgImage = {
        backgroundImage: `url(${results[randPicture].urls.small})`
    }
    return (
        <div
            className="picture"
            key={results[0].id}
            style={bgImage}
        >
        </div >
    );
}

import React from 'react'
import PropTypes from 'prop-types'
import './expand-picture.scss'

export const ExpandPicture = ({ imageResp }) => {
    const randPicture = Math.floor(Math.random() * 9);
    const bgImage = {
        backgroundImage: `url(${imageResp[randPicture].urls.small})`
    }
    return (
        <div
            className="picture"
            key={imageResp[0].id}
            style={bgImage}
        >
        </div >
    );
}

ExpandPicture.propTypes = {
    imageResp: PropTypes.arrayOf(PropTypes.object)
}
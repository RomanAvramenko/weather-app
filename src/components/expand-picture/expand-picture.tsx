import React from 'react'
import { useSelector } from 'react-redux'
import './expand-picture.scss'

type RootState = { expand: object }

interface IResponse {
    urls: { small: string },
    id: string
}

interface Expand {
    imageResp?: IResponse[]
}

export const ExpandPicture = () => {
    const { imageResp }: Expand = useSelector((state: RootState) => state.expand)
    const randPicture: number = Math.floor(Math.random() * 9);
    const bgImage: object = {
        backgroundImage: `url(${imageResp![randPicture].urls.small})`
    }
    return (
        <div
            className="picture"
            key={imageResp![randPicture].id}
            style={bgImage}
        >
        </div >
    );
}

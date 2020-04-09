import React from "react";
import { useSelector } from "react-redux";
import "./expand-picture.scss";
import { ForecastImageType } from "../../types/types";

type RootState = { expand: object };

export const ExpandPicture = () => {
  const { imageResp }: ForecastImageType = useSelector(
    (state: RootState) => state.expand
  );
  const randPicture: number = Math.floor(Math.random() * 9);
  const bgImage: object = {
    backgroundImage: `url(${imageResp![randPicture].urls.small})`,
  };
  return (
    <div
      className="picture"
      key={imageResp![randPicture].id}
      style={bgImage}
    ></div>
  );
};

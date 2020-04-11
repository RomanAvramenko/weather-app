import React from "react";
import { useSelector } from "react-redux";
import "./expand-picture.scss";
import { RootState } from "../../types/types";

export const ExpandPicture = () => {
  const { imageResp } = useSelector((state: RootState) => state.expand);
  const randPicture = Math.floor(Math.random() * 9);
  const bgImage = {
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

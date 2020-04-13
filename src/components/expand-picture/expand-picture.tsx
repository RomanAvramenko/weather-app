import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import "./expand-picture.scss";

export const ExpandPicture = () => {
  const imageResp = useSelector(
    (state: AppStateType) => state.expand.imageResp
  );
  const randPicture = Math.floor(Math.random() * 9);
  const bgImage = {
    backgroundImage: `url(${imageResp![randPicture].urls.small})`,
  };
  return (
    <div className="picture" key={imageResp![randPicture].id} style={bgImage} />
  );
};

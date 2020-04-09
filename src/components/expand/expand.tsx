import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../spinner/spinner";
import { ExpandForecast } from "../expand-forecast/expand-forecast";
import { ExpandPicture } from "../expand-picture/expand-picture";
import { getData } from "../../store/actions/expand";
import { ForecastData, ForecastImageType } from "../../types/types";

type ExpandProps = { location: object };

type RootState = { expand: object };

type Expand = {
  expandForecast?: ForecastData;
  imageResp?: ForecastImageType;
};

export const Expand = ({ location }: ExpandProps) => {
  const dispatch = useDispatch();
  const { expandForecast, imageResp }: Expand = useSelector(
    (state: RootState) => state.expand
  );

  useEffect(() => {
    dispatch(getData(location));
    // eslint-disable-next-line
  }, [location]);

  const renderChild = () => {
    return (
      <>
        <ExpandForecast />
        <ExpandPicture />
      </>
    );
  };

  return !expandForecast || !imageResp ? <Spinner /> : renderChild();
};

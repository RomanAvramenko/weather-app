import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../spinner/spinner";
import { ExpandForecast } from "../expand-forecast/expand-forecast";
import { ExpandPicture } from "../expand-picture/expand-picture";
import { getData, exportForecastFetchStart } from "../../store/actions/expand";
import { ForecastData, ForecastImageType } from "../../types/types";

type ExpandProps = { location: { state: { name: string } } };

type RootState = { expand: object };

type Expand = {
  expandForecast?: ForecastData;
  imageResp?: ForecastImageType;
  loading?: boolean;
};

export const Expand = ({ location }: ExpandProps) => {
  const dispatch = useDispatch();
  const { expandForecast, imageResp, loading }: Expand = useSelector(
    (state: RootState) => state.expand
  );

  useEffect(() => {
    dispatch(exportForecastFetchStart());
    window.addEventListener("beforeunload", () =>
      sessionStorage.setItem("key", location.state.name)
    );
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

  return loading || !expandForecast || !imageResp ? (
    <Spinner />
  ) : (
    renderChild()
  );
};

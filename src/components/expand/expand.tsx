import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../spinner/spinner";
import { ExpandForecast } from "../expand-forecast/expand-forecast";
import { ExpandPicture } from "../expand-picture/expand-picture";
import {
  expandForecastFetchStart,
  getExpandData,
} from "../../store/actions/expand";
import { AppStateType } from "../../store/store";

type ExpandProps = { location: { state: { name: string } } };

export const Expand = ({ location }: ExpandProps) => {
  const dispatch = useDispatch();
  const { expandForecast, imageResp, loading } = useSelector(
    (state: AppStateType) => state.expand
  );

  useEffect(() => {
    dispatch(expandForecastFetchStart());
    window.addEventListener("beforeunload", () =>
      sessionStorage.setItem("key", location.state.name)
    );
    dispatch(getExpandData(location));
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
  return loading || !expandForecast || !imageResp ? <Spinner /> : renderChild();
};

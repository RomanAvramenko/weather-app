import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "../spinner/spinner";
import { URL_FORECAST, API_KEY_OW, URL_IMAGE, API_KEY_US } from "../../constants"
import { ExpandForecast } from "../expand-forecast/expand-forecast";
import { ExpandPicture } from "../expand-picture/expand-picture";

export const Expand = ({ location }) => {
  const initialState = {
    expandForecast: null,
    imageResp: [],
  };

  const [state, setState] = useState(initialState)



  useEffect(() => {
    const getData = async () => {
      const state = location.state
      if (state) {
        window.addEventListener(
          "beforeunload",
          window.sessionStorage.setItem("key", state.name)
        );
      }
      const loadData = undefined;
      const stateCheck = loadData ? state.name : window.sessionStorage.getItem("key");
      const urlWeather = `${URL_FORECAST}q=${stateCheck}&units=metric${API_KEY_OW}`;
      const urlImage = `${URL_IMAGE + API_KEY_US}&page=1&query=${stateCheck} city buildings`;
      await axios
        .all([
          axios.get(urlWeather),
          axios.get(urlImage)
        ])
        .then(
          axios.spread((result, imgResp) => {
            setState({
              expandForecast: transformData(result),
              imageResp: imgResp.data
            });
          })
        )
        .catch(e => {
          console.log(e);
        });
    }
    const transformData = (result) => {
      return {
        id: result.data.city.id,
        name: result.data.city.name,
        list: stateParser(result.data.list)
      }
    }
    getData()
    return () => location
  }, [location])



  const stateParser = (list) => {
    const currentDay = list[0].dt_txt.replace(/ .*$/, '');
    const filteredDays = [];
    list.map(item => {
      const days = item.dt_txt.replace(/ .*$/, '');
      if (currentDay !== days) {
        filteredDays.push(item)
      }
      return item
    });
    ;
    return filteredDays.filter((i, index) => index % 4 === 0);
  }

  const renderChild = () => {
    return (
      <>
        <ExpandForecast expandForecast={state.expandForecast} />
        <ExpandPicture imageResp={state.imageResp} />
      </>
    )
  }

  return (
    state.expandForecast !== null
      ? renderChild()
      : <Spinner />)
}

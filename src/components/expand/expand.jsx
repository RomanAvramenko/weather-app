import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import axios from "axios"
import { Spinner } from "../spinner/spinner"
import { URL_FORECAST, API_KEY_OW, URL_IMAGE, API_KEY_US } from "../../constants"
import { ExpandForecast } from "../expand-forecast/expand-forecast"
import { ExpandPicture } from "../expand-picture/expand-picture"
import { expandForecastReceive } from '../../store/actions/expand'

export const Expand = ({ location }) => {

  const dispatch = useDispatch()
  const { expandForecast } = useSelector(state => state.expand)

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
            return dispatch(expandForecastReceive(result, imgResp))
          })
        )
        .catch(e => {
          console.log(e);
        });
    }
    getData()
    return () => location
  }, [location])

  const renderChild = () => {
    return (
      <>
        <ExpandForecast/>
        <ExpandPicture/>
      </>
    )
  }

  return (
    expandForecast !== null
      ? renderChild()
      : <Spinner />)
}

Expand.propTypes = {
  location: PropTypes.object
}
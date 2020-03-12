import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Spinner } from "../spinner/spinner"
import { ExpandForecast } from "../expand-forecast/expand-forecast"
import { ExpandPicture } from "../expand-picture/expand-picture"
import { getData } from '../../store/actions/expand'

export const Expand = ({ location }) => {

  const dispatch = useDispatch()
  const { expandForecast, imageResp } = useSelector(state => state.expand)

  useEffect(() => {
    dispatch(getData(location))
    return () => location
    // eslint-disable-next-line
  }, [location])

  const renderChild = () => {
    return (
      <>
        <ExpandForecast />
        <ExpandPicture />
      </>
    )
  }

  return (
    !expandForecast || !imageResp
      ? <Spinner />
      : renderChild()
  )
}

Expand.propTypes = {
  location: PropTypes.object
}
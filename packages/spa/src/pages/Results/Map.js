import React, { useRef, useEffect, memo } from 'react'
import styled from 'styled-components'
import { Map as Mapeable, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types'
import L from 'leaflet'

import Marker from './Marker'

const Container = styled(Mapeable)`
  width: 100%;
  height: 100%;

  .icon {
    border: none;
    background: transparent;
  }

  .leaflet-tile-pane {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }
`

const center = { lat: -23.4101664, lng: -51.9281918 }

function Map({ data, setRentsInView }) {
  const ref = useRef()

  const getOnlyInView = () => {
    const markers = []
    const map = ref.current.leafletElement

    map.eachLayer(layer => {
      layer instanceof L.Marker &&
        map.getBounds().contains(layer.getLatLng()) &&
        markers.push(layer.options)
    })

    setRentsInView(markers)
  }

  useEffect(() => {
    setTimeout(
      () => ref.current && ref.current.leafletElement.invalidateSize(),
      1000
    )
  }, [])

  return (
    <Container
      ref={ref}
      center={center}
      zoom={14}
      maxZoom={17}
      zoomControl={false}
      onmoveend={getOnlyInView}
    >
      <TileLayer url="https://api.mapbox.com/styles/v1/iamgbayer/cjyuvqzgv09ph1cp7slxoz5y4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWFtZ2JheWVyIiwiYSI6ImNqdDdpb2s0NDA4Mm80YWxqYWZvMmgxeW4ifQ.v9gVtBtE3cCk5ijRS0R6Kw" />

      {data.map(({ id, latitude, longitude, ...props }) => (
        <Marker id={id} key={id} position={[latitude, longitude]} {...props} />
      ))}
    </Container>
  )
}

Map.propTypes = {
  setRentsInView: PropTypes.func.isRequired
}

export default memo(Map)

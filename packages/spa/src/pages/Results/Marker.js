import React, { useContext } from 'react'
import { Marker as Markeable } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import styled, { ThemeContext } from 'styled-components'
import L from 'leaflet'
import { prop } from 'styled-tools'

import Store from 'store'

const Colorizable = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${prop('color')};
  border-radius: ${prop('radius')};
`

const buildIcon = ({ color, radius }) =>
  L.divIcon({
    html: ReactDOMServer.renderToString(
      <Colorizable color={color} radius={radius}></Colorizable>
    ),
    className: 'icon'
  })

export default function Marker({ id, position, ...props }) {
  const { colors, border } = useContext(ThemeContext)
  const { config } = Store.useStores()

  const selectInMap = () => config.set('selected')(id)

  return (
    <Markeable
      id={id}
      onClick={selectInMap}
      position={position}
      {...props}
      icon={buildIcon({
        color: colors.sixtiary,
        radius: border.radius.fifty
      })}
    />
  )
}

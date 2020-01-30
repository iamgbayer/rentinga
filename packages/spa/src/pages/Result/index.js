import React, { useEffect, useState, useContext } from 'react'
import ImageGallery from 'react-image-gallery'
import { API, graphqlOperation } from 'aws-amplify'
import { isEmpty } from 'ramda'
import styled, { ThemeContext } from 'styled-components'

import { Text } from 'components'
import { getPhotosByResource } from 'utils'
import { getRent } from 'graphql/queries'
import { theme } from 'styled-tools'

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  .image-gallery-slide img {
    width: 100%;
    height: 100%;
    max-height: 500px;
  }

  .image-gallery-image {
    border-radius: ${theme('border.radius.four')};
    overflow: hidden;
  }

  .image-gallery-bullets-container button {
    padding: 3px;
    box-shadow: none;
  }

  .image-gallery-left-nav,
  .image-gallery-right-nav {
    font-size: 45px;

    &:hover {
      &::before {
        color: ${theme('colors.primary')};
      }
    }

    &::before {
      text-shadow: none;
    }
  }
`

const Description = styled.div``

export function Result({ match }) {
  const { colors } = useContext(ThemeContext)

  const [data, setData] = useState([])

  const id = match.params.id

  const fetchRentById = async () => {
    const { data } = await API.graphql(
      graphqlOperation(getRent, {
        id
      })
    )

    return data.getRents
  }

  useEffect(() => {
    fetchRentById().then(setData)
  }, [])

  if (isEmpty(data)) {
    return <div>loading</div>
  }

  const {
    photos,
    title,
    building,
    garage,
    rooms,
    suites,
    price,
    tax,
    condominium
  } = data

  const images = getPhotosByResource(photos)

  return (
    <Container>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        items={images}
      />

      <Description>
        <Text size={Text.size.twentySix} weight={Text.weight.bold}>
          {building}
        </Text>

        <Text size={Text.size.fourteen} color={colors.quartiary}>
          {title}
        </Text>
      </Description>
    </Container>
  )
}

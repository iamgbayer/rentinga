import React, { useContext, memo } from 'react'
import styled, { ThemeContext, css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import ImageGallery from 'react-image-gallery'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import 'react-image-gallery/styles/css/image-gallery.css'

import { Text, Box, Icon } from 'components'
import { getPhotosByResource } from 'utils'

const Container = styled(Box)`
  width: 100%;
  max-width: 260px;
  height: 320px;
  display: flex;
  flex-direction: column;
  flex: 1 50%;
  border: 1px solid ${theme('opacity.secondary')};
  border-radius: ${theme('border.radius.four')};
  cursor: pointer;
  overflow: hidden;

  ${ifProp(
    { isInView: true },
    css`
      box-shadow: ${theme('shadow.tertiary')};
    `
  )}

  &:hover {
    box-shadow: ${theme('shadow.tertiary')};
  }

  .image-gallery-slide img {
    width: 100%;
    height: 180px;
  }

  .image-gallery-bullets-container button {
    padding: 3px;
    box-shadow: none;
  }

  .image-gallery-left-nav,
  .image-gallery-right-nav {
    font-size: 20px;

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

const Content = styled.div`
  width: 100%;
  padding: 10px;
  width: 100%;
  height: calc(320px - 180px);
`

const Iconable = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icons = styled(Box)`
  display: flex;
`

function Rent({ data, isInView }) {
  const { colors } = useContext(ThemeContext)

  const {
    id,
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
    <Container
      isInView={isInView}
      id={id}
      left={10}
      right={10}
      top={10}
      bottom={10}
    >
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        items={images}
      />
      <Link to={`/rents/${id}`}>
        <Content>
          <Text weight={Text.weight.bold}>{building}</Text>

          <Icons top={15}>
            <Iconable right={10}>
              <Icon
                name="bedrooms"
                color={colors.secondary}
                width={20}
                height={20}
                right={5}
              />
              <Text color={colors.secondary}>{rooms}</Text>
            </Iconable>

            <Iconable>
              <Icon
                name="car"
                color={colors.secondary}
                width={20}
                height={20}
                right={5}
              />
              <Text color={colors.secondary}>{garage}</Text>
            </Iconable>
          </Icons>
        </Content>
      </Link>
    </Container>
  )
}

Rent.propTypes = {
  isInView: PropTypes.bool.isRequired
}

export default memo(Rent)

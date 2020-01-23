import React from 'react'
import styled from 'styled-components'

export const unstringify = data => JSON.parse(`{ "data": ${data} }`).data || []

const Image = styled.img`
  max-width: 100%;
  height: auto;
`
const onError = ({ target }) => {
  target.onerror = null
  target.src = 'https://via.placeholder.com/260x180&text=%20'
}

const renderImageWithFallback = ({ original }) => (
  <Image src={original} onError={onError} />
)

export const getPhotosByResource = resources =>
  unstringify(resources).map(resource => ({
    original: `https://s3.amazonaws.com/portal-sub100/imoveis/${resource}.jpg`,
    renderImage: renderImageWithFallback
  }))

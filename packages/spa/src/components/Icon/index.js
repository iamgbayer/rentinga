import React, { memo, lazy, Suspense, useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext, css } from 'styled-components'

import { Box } from '../Box'
import { ifProp } from 'styled-tools'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const load = name => lazy(() => import(`./Icons/${capitalize(name)}`))

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;

  ${ifProp(
    'onClick',
    css`
      cursor: pointer;
    `
  )}
`

export const Icon = memo(({ name, className, onClick, color, ...props }) => {
  const { colors } = useContext(ThemeContext)
  const Iconable = load(name)

  return (
    <Box {...props}>
      <Container className={className} onClick={onClick}>
        <Suspense fallback={null}>
          <Iconable {...props} color={color || colors.primary} />
        </Suspense>
      </Container>
    </Box>
  )
})

const names = ['search', 'down', 'dollar', 'bedrooms', 'suite', 'car']

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.oneOf(names).isRequired
}

Icon.defaultProps = {
  width: 20,
  height: 20
}

Icon.name = Object.assign(
  {},
  ...names.map(name => ({
    [name]: name
  }))
)

import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { switchProp, ifProp, prop } from 'styled-tools'

import { Box } from 'components'

const Container = styled(Box)`
  width: 100%;
  position: relative;

  ${ifProp(
    'detailed',
    css`
      display: flex;
    `
  )}

  ${switchProp('size', {
    default: css`
      max-width: 225px;
      height: 40px;
    `,
    large: css`
      max-width: 350px;
      height: 50px;
    `
  })};

  ${ifProp(
    'full',
    css`
      max-width: 100%;
    `
  )};
`

const Inputable = styled.input`
  border: none;
  width: 100%;
  font-size: ${prop('theme.font.size.eighteen')};
  font-weight: ${prop('theme.font.weight.medium')};
  border-radius: ${prop('theme.border.radius.four')};
  background-color: ${prop('theme.colors.primary')};
  color: ${prop('theme.colors.secondary')};
  outline: none;
  padding: 0 15px;
  position: relative;
  z-index: ${prop('theme.zindex.ten')};

  ${ifProp(
    'full',
    css`
      width: 100%;
    `
  )};

  ${ifProp(
    { smooth: true },
    css`
      box-shadow: ${prop('theme.shadow.secondary')};
    `,
    css`
      border: 1px solid ${prop('theme.opacity.secondary')};
    `
  )};
`

const Detail = styled.div`
  width: 60px;
  background-color: ${prop('theme.colors.tertiary')};
  border-radius: ${prop('theme.border.radius.four')};
  z-index: ${prop('theme.zindex.five')};
  position: absolute;
  top: 0;
  left: -3px;

  ${switchProp('size', {
    default: css`
      height: 40px;
    `,
    large: css`
      height: 50px;
    `
  })};
`

export const Input = ({ smooth, size, full, detailed, ...props }) => {
  return (
    <Container {...props} detailed={detailed} size={size} full={full}>
      <Inputable smooth={smooth} />
      {detailed && <Detail size={size} />}
    </Container>
  )
}

Input.size = {
  default: 'default',
  large: 'large'
}

Input.defaultProps = {
  smooth: false,
  full: false,
  size: Input.size.default
}

Input.propTypes = {
  smooth: PropTypes.bool
}

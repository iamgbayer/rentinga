import React from 'react'
import styled from 'styled-components'

import { Box, Tokens } from 'components'
import { prop, ifProp, theme } from 'styled-tools'

const Container = styled.span`
  font-weight: ${ifProp(
    'weight',
    prop('weight'),
    theme('font.weight.regular')
  )};
  font-size: ${ifProp('size', prop('size'), theme('font.size.fourteen'))};
  font-family: ${theme('font.family.roboto')};
  color: ${ifProp('color', prop('color'), theme('colors.secondary'))};
`

export const Text = ({ children, weight, size, color, ...props }) => {
  return (
    <Box {...props}>
      <Container size={size} weight={weight} color={color}>
        {children}
      </Container>
    </Box>
  )
}

Text.size = Tokens.font.size
Text.weight = Tokens.font.weight

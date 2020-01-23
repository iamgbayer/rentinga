import React, { useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components'
import { switchProp, ifProp, theme } from 'styled-tools'

import { Box } from 'components'

const Container = styled.button`
  cursor: pointer;
  border-radius: ${theme('border.radius.twentyFive')};
  width: ${ifProp({ full: true }, '100%', 'unset')};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;

  ${switchProp('size', {
    default: css`
      padding: 5px 15px;
    `,
    large: css`
      padding: 10px 15px;
      font-size: ${theme('font.size.eighteen')};
    `,
    extra: css`
      padding: 10px 15px;
      font-size: ${theme('font.size.eighteen')};
      font-weight: ${theme('font.weight.bold')};
    `
  })};

  ${switchProp('variant', {
    primary: css`
      background-color: ${theme('colors.tertiary')};
      color: ${theme('colors.primary')};
      border: 1px solid ${theme('colors.tertiary')};
      box-shadow: ${theme('shadow.primary')};

      &:hover {
        transition: all 0.5s;
        transform: scale(1.03);
      }
    `
  })};

  &:focus {
    outline: none;
  }
`

const Icon = styled.div`
  margin-left: 10px;
  display: flex;
`

export const Button = ({
  onClick,
  icon,
  children,
  size,
  variant,
  full,
  ...props
}) => {
  const { colors } = useContext(ThemeContext)

  return (
    <Box {...props}>
      <Container onClick={onClick} full={full} size={size} variant={variant}>
        {children}

        {icon && <Icon>{icon({ color: colors[variant] })}</Icon>}
      </Container>
    </Box>
  )
}

Button.size = {
  default: 'default',
  large: 'large',
  extra: 'extra'
}

Button.variant = {
  primary: 'primary'
}

Button.defaultProps = {
  variant: Button.variant.primary,
  size: Button.size.default
}

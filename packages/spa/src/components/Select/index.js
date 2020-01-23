import React, { memo, useState, useContext, useEffect } from 'react'
import styled, { css, ThemeContext } from 'styled-components'
import PropTypes from 'prop-types'
import { ifProp, switchProp, theme } from 'styled-tools'

import { Icon, Box } from 'components'

const Container = styled(Box)`
  position: relative;
  width: 100%;

  ${switchProp('size', {
    default: css`
      max-width: 225px;
    `,
    large: css`
      max-width: 350px;
    `,
    box: css`
      max-width: 185px;
    `
  })};

  ${ifProp(
    { full: true },
    css`
      max-width: 100%;
    `
  )};
`

const Selectable = styled.div`
  width: 100%;
  padding: 0 16px;
  font-size: ${theme('font.size.fifteen')};
  border-radius: ${theme('border.radius.four')};
  background-color: ${theme('colors.primary')};
  color: ${theme('colors.secondary')};
  outline: 0;
  appearance: none;
  cursor: ${ifProp('disabled', 'not-allowed', 'pointer')};
  position: relative;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${switchProp('size', {
    default: css`
      height: 40px;
    `,
    large: css`
      height: 50px;
    `,
    box: css`
      height: 160px;
      flex-direction: column;
      justify-content: space-evenly;
    `
  })};

  ${ifProp(
    { smooth: true },
    css`
      box-shadow: ${theme('shadow.secondary')};
    `,
    css`
      border: 1px solid ${theme('opacity.secondary')};
    `
  )};
`

const Options = styled.ul`
  width: 100%;
  top: calc(100% + 4px);
  position: absolute;
  border-radius: ${theme('border.radius.four')};
  overflow: hidden;
  list-style: none;
  z-index: ${theme('zindex.nineThousand')};

  ${ifProp(
    { smooth: true },
    css`
      box-shadow: ${theme('shadow.secondary')};
    `,
    css`
      border: 1px solid ${theme('opacity.secondary')};
    `
  )};

  display: ${ifProp({ show: true }, 'block', 'none')};
`

const Option = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 14px;
  padding-right: 14px;
  cursor: pointer;
  color: ${theme('colors.secondary')};
  background-color: ${theme('colors.primary')};
  font-weight: ${theme('font.weight.regular')};
  font-size: ${theme('font.size.fourteen')};

  &:hover {
    font-weight: ${theme('font.weight.medium')};
  }
`

const Title = styled.span`
  font-size: ${theme('font.size.ninety')};
  font-weight: ${theme('font.weight.medium')};
`

export const Select = memo(
  ({
    options,
    onChange,
    defaultValue,
    disabled,
    required,
    full,
    size,
    smooth,
    icon,
    ...props
  }) => {
    const { colors } = useContext(ThemeContext)
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(defaultValue)
    const [focus, setFocus] = useState(false)

    const toggleShow = () => setShow(!show)

    const toCloseOutside = () => {
      setShow(false)
      setFocus(false)
    }

    const whenSelected = ({ text, value }) => () => {
      toggleShow()
      setSelected({ text, value })
      onChange({ text, value })
    }

    const whenFocus = () => setFocus(!focus)

    return (
      <Container full={full} size={size} {...props}>
        <Selectable
          onClick={!disabled ? toggleShow : undefined}
          size={size}
          smooth={smooth}
        >
          {icon && icon({ color: colors.secondary, width: 25, height: 25 })}
          <Title>{selected.text}</Title>
          <Icon name="down" width={15} height={15} color={colors.secondary} />
        </Selectable>

        <Options show={show} size={size} smooth={smooth}>
          {options.map(({ value, text }) => (
            <Option
              key={value}
              value={value}
              onClick={whenSelected({ value, text })}
            >
              {text}
            </Option>
          ))}
        </Options>
      </Container>
    )
  }
)

Select.size = {
  default: 'default',
  large: 'large',
  box: 'box'
}

Select.defaultProps = {
  size: Select.size.default,
  smooth: false,
  onChange: () => {}
}

Select.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.any,
    text: PropTypes.string
  }).isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['default', 'large', 'box']),
  smooth: PropTypes.bool
}

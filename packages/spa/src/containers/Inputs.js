import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Store from 'store'
import media from 'styled-media-query'
import { withBreakpoints } from 'react-breakpoints'
import { useTranslation } from 'react-i18next'

import { Icon, Input, Select, Box } from 'components'

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.lessThan('small')`
    flex-direction: column;
  `}
`

const Secondary = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Inputs = withBreakpoints(
  ({ compacted, breakpoints, currentBreakpoint }) => {
    const { filters } = Store.useStores()
    const { t } = useTranslation()
    const { bedroom, garage, price, type } = filters.state

    const isMobile = breakpoints[currentBreakpoint] === breakpoints.small

    const set = type => filter => filters.set(type)(filter)

    const props = {
      true: {
        secondary: {
          top: 30
        },
        select: {
          size: Select.size.default
        }
      },
      false: {
        secondary: {
          top: 50
        },
        select: {
          size: Select.size.box
        }
      }
    }

    return (
      <>
        <Main>
          <Input
            smooth={true}
            placeholder={t('home.search')}
            size={Input.size.large}
            right={isMobile ? 0 : 15}
            bottom={isMobile ? 15 : 0}
            full={isMobile}
            detailed={true}
          />

          <Select
            smooth={true}
            size={Select.size.large}
            full={isMobile}
            defaultValue={{ ...type, text: t(type.text) }}
            onChange={set('type')}
            options={[
              { value: 'apartamentos', text: t('home.type.apartments') },
              { value: 'casas', text: t('home.type.houses') },
              { value: 'kitnet', text: t('home.type.kitnet') }
            ]}
          />
        </Main>

        <Secondary data-testid="secondary" top={props[compacted].secondary.top}>
          <Select
            right={15}
            size={props[compacted].select.size}
            defaultValue={{ ...price, text: t(price.text) }}
            onChange={set('price')}
            icon={({ color, width, height }) => (
              <Icon name="dollar" color={color} width={width} height={height} />
            )}
            options={[
              { value: [0, 600], text: t('home.price.0,600') },
              { value: [601, 1000], text: t('home.price.601,1000') },
              { value: [1001, 1500], text: t('home.price.1001,1500') },
              { value: [1501, 3000], text: t('home.price.1501,3000') },
              { value: [3001, 5000], text: t('home.price.3001,5000') },
              { value: [5001, 50000], text: t('home.price.5001,50000') }
            ]}
          />

          <Select
            right={15}
            size={props[compacted].select.size}
            onChange={set('bedroom')}
            defaultValue={{ ...bedroom, text: t(bedroom.text) }}
            icon={({ color, width, height }) => (
              <Icon
                name="bedrooms"
                color={color}
                width={width}
                height={height}
              />
            )}
            options={[
              { value: [0, 0], text: t('home.bedroom.0,0') },
              { value: [1, 1], text: t('home.bedroom.1,1') },
              { value: [2, 2], text: t('home.bedroom.2,2') },
              { value: [3, 50], text: t('home.bedroom.3,50') },
              { value: [0, 50], text: t('home.bedroom.0,50') }
            ]}
          />

          <Select
            right={15}
            size={props[compacted].select.size}
            defaultValue={{ ...garage, text: t(garage.text) }}
            onChange={set('garage')}
            icon={({ color, width, height }) => (
              <Icon name="car" color={color} width={width} height={height} />
            )}
            options={[
              { value: [0, 0], text: t('home.garage.0,0') },
              { value: [1, 1], text: t('home.garage.1,1') },
              { value: [2, 50], text: t('home.garage.2,50') },
              { value: [0, 50], text: t('home.garage.0,50') }
            ]}
          />
        </Secondary>
      </>
    )
  }
)

Inputs.defaultProps = {
  compacted: false
}

Inputs.propTypes = {
  compacted: PropTypes.bool.isRequired
}

import React, { memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import v4 from 'uuid/v4'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { equals, length } from 'ramda'

import 'react-perfect-scrollbar/dist/css/styles.css'

import Store from 'store'
import { Text } from 'components'
import Rent from './Rent'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Column = styled.div`
  max-width: 570px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

function List({ data }) {
  const ref = useRef()
  const { config } = Store.useStores()
  const selected = config.get('selected')

  useEffect(() => {
    const element = selected && document.getElementById(selected)

    if (element) {
      ref.current._container.scrollTop = element.offsetTop
    }
  }, [selected])

  return (
    <Column>
      <Text left={10} bottom={5}>
        Há {length(data)} apartamentos disponíveis em sua busca.
      </Text>
      <PerfectScrollbar ref={ref} style={{ width: '610px' }}>
        <Container>
          {data.map(rent => (
            <Rent key={v4()} data={rent} isInView={equals(rent.id, selected)} />
          ))}
        </Container>
      </PerfectScrollbar>
    </Column>
  )
}

export default memo(List)

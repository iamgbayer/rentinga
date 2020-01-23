import React, { useEffect, useState, memo } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { prop } from 'ramda'

import { listRents } from 'graphql/queries'
import { Inputs } from 'containers'
import { Box, AnimableInputs } from 'components'
import Store from 'store'

import List from './List'
import Map from './Map'

const transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const enterWithX = x => ({
  initial: { opacity: 0, x: '-100%' },
  enter: { opacity: 1, x, transition },
  exit: { opacity: 0 }
})

const enterWithY = y => ({
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    y,
    transition: {
      duration: 0.8,
      delay: 0.2
    }
  },
  exit: { opacity: 0 }
})

const Content = styled(Box)`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
`

export const Results = memo(() => {
  const [rents, setRents] = useState([])
  const [rentsInView, setRentsInView] = useState([])
  const { filters } = Store.useStores()

  const fetchRents = async () => {
    const { data } = await API.graphql(
      graphqlOperation(listRents, {
        garage: prop('value', filters.get('garage')),
        bedroom: prop('value', filters.get('bedroom')),
        total: prop('value', filters.get('price'))
      })
    )

    return data.listRents.items
  }

  useEffect(() => {
    fetchRents().then(rents => {
      setRents(rents)
      setRentsInView(rents)
    })
  }, [filters])

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
      }}
    >
      <AnimableInputs variants={enterWithY(30)}>
        <Inputs compacted={true} />
      </AnimableInputs>

      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={enterWithX('0%')}
      >
        <Content top={30}>
          <List data={rentsInView} />
          <Map data={rents} setRentsInView={setRentsInView} />
        </Content>
      </motion.div>
    </motion.div>
  )
})

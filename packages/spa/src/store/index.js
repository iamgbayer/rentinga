import { createConnectedStoreAs, withReduxDevtools } from 'undux'

const state = {
  filters: {
    price: {
      value: [0, 600],
      text: 'home.price.0,600'
    },
    garage: {
      value: [0, 50],
      text: 'home.garage.0,50'
    },
    bedroom: { value: [0, 50], text: 'home.bedroom.0,50' },
    type: {
      value: 'apartamentos',
      text: 'home.type.apartments'
    }
  },
  config: {
    selected: null
  }
}

export default createConnectedStoreAs(state, ({ filters, config }) => ({
  filters: withReduxDevtools(filters),
  config: withReduxDevtools(config)
}))

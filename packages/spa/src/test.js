import React from 'react'
import { Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { createMemoryHistory } from 'history'

import { Provider } from 'state'
import { Tokens } from 'components'

export const history = { ...createMemoryHistory('/'), push: jest.fn() }

export const withDependencies = Component => (
  <ThemeProvider theme={Tokens}>
    <Provider>
      <Router history={history}>{Component}</Router>
    </Provider>
  </ThemeProvider>
)

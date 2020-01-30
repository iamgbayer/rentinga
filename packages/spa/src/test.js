import React from 'react'
import { Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { createMemoryHistory } from 'history'
import ReactBreakpoints from 'react-breakpoints'

import Store from 'store'
import { Tokens } from 'components'

export const history = { ...createMemoryHistory('/'), push: jest.fn() }

export const withDependencies = Component => (
  <ThemeProvider theme={Tokens}>
    <Store.Container>
      <ReactBreakpoints breakpoints={Tokens.breakpoints}>
        <Router history={history}>{Component}</Router>
      </ReactBreakpoints>
    </Store.Container>
  </ThemeProvider>
)

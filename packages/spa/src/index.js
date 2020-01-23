import React from 'react'
import ReactDOM from 'react-dom'
import ReactBreakpoints from 'react-breakpoints'

import { ThemeProvider } from 'styled-components'

import Router from 'Router'
import { Reset, Tokens } from 'components'

import 'client'

import Store from 'store'

import * as serviceWorker from './serviceWorker'

import './i18n'

ReactDOM.render(
  <Store.Container>
    <ThemeProvider theme={Tokens}>
      <ReactBreakpoints breakpoints={Tokens.breakpoints}>
        <>
          <Reset />
          <Router />
        </>
      </ReactBreakpoints>
    </ThemeProvider>
  </Store.Container>,
  document.getElementById('root')
)

serviceWorker.unregister()

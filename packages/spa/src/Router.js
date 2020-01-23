import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Home, Results, Result, About } from 'pages'

function Router() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route path="/" exact component={Home} />
                <Route path="/rents" exact component={Results} />
                <Route path="/rents/:id" component={Result} />
                <Route path="/about" component={About} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </BrowserRouter>
    </Suspense>
  )
}

export default Router

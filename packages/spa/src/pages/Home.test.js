import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Home } from './Home'
import { withDependencies, history } from 'test'

test('Should push to rents resource', () => {
  const { getByTestId } = render(withDependencies(<Home />))

  fireEvent.click(getByTestId('search').firstChild)

  expect(history.push).toHaveBeenCalledWith('/rents')
})

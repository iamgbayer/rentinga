import React from 'react'
import { render } from '@testing-library/react'

import { Inputs } from './Inputs'
import { withDependencies } from 'test'

/**
 * @todo This import shouldn't be here, see rtl.config.js
 */
import 'jest-styled-components'

test('Should not expect visual regression', () => {
  const { container } = render(withDependencies(<Inputs />))

  expect(container.firstChild).toMatchSnapshot()
})

test('Should renders accordingly compacted property', () => {
  const { getByTestId, rerender } = render(withDependencies(<Inputs />))

  expect(getByTestId('secondary')).toHaveStyleRule('margin-top', '50px')

  rerender(withDependencies(<Inputs compacted={true} />))

  expect(getByTestId('secondary')).toHaveStyleRule('margin-top', '30px')
})

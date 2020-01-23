import { createGlobalStyle } from 'styled-components'
import { prop } from 'styled-tools'

export const Reset = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button,
  span,
  a,
  p,
  li {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${prop('theme.font.family.roboto')}, sans-serif;
    font-weight: ${prop('theme.font.weight.regular')};
  }
`

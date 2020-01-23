import { rem, rgba, opacify } from 'polished'

const colors = {
  primary: '#fff',
  secondary: '#2a3a3b',
  tertiary: rgba(61, 217, 212, 1),
  quartiary: rgba(114, 119, 138, 1),
  quintiary: rgba(87, 93, 169, 0.1),
  sixtiary: '#39edc2'
}

const opacity = {
  primary: opacify(0.2, colors.tertiary),
  secondary: opacify(0.1, colors.quintiary)
}

export const Tokens = {
  colors,
  opacity,
  breakpoints: {
    small: 450,
    medium: 768,
    large: 1170
  },
  shadow: {
    primary: `0 0 20px 0 ${opacity.primary}`,
    secondary: `0 2px 10px ${opacity.secondary}`,
    tertiary: `0 4px 15px 0 ${opacity.secondary}`
  },
  border: {
    radius: {
      four: rem(4),
      twentyFive: rem(25),
      fifty: '50%'
    }
  },
  zindex: {
    five: 5,
    ten: 10,
    fifty: 50,
    nineThousand: 9000
  },
  font: {
    family: {
      roboto: 'Roboto'
    },
    size: {
      twentySix: rem(26),
      twentyFour: rem(24),
      eighteen: rem(18),
      fourteen: rem(14),
      ninety: '90%'
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    }
  }
}

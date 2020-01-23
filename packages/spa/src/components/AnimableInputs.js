import styled from 'styled-components'
import { theme } from 'styled-tools'
import { motion } from 'framer-motion'

export const AnimableInputs = styled(motion.div)`
  width: 100%;
  z-index: ${theme('zindex.nineThousand')};
`

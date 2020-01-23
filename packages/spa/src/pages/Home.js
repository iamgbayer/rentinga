import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import media from 'styled-media-query'
import { withBreakpoints } from 'react-breakpoints'
import { useTranslation } from 'react-i18next'

import { Button, Icon, Text, Box, AnimableInputs } from 'components'
import { Inputs } from 'containers'

const Header = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${media.lessThan('medium')`
    padding: 0 15px;
    text-align: center;
  `}

  ${media.lessThan('small')`
    padding: 0 25px;
    display: block;
  `}
`

const AnimableButton = styled(motion.div)`
  ${media.lessThan('small')`
    padding-bottom: 40px;
  `}
`

const Languages = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
`

const Language = styled(Box)``

const enterWithY = y => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, y },
  exit: { opacity: 0 }
})

export const Home = withBreakpoints(
  withRouter(({ history, breakpoints, currentBreakpoint }) => {
    const { t, i18n } = useTranslation()

    const toSearch = () => history.push('/rents')

    const changeLanguage = language => i18n.changeLanguage(language)

    const isMobile = breakpoints[currentBreakpoint] === breakpoints.small

    return (
      <Header
        exit="exit"
        initial="initial"
        animate="enter"
        variants={{ enter: { transition: { staggerChildren: 0.4 } } }}
      >
        <motion.div variants={enterWithY(100)}>
          <Text weight={Text.weight.bold} size={Text.size.twentySix}>
            {t('home.title')}
          </Text>
        </motion.div>

        <AnimableInputs variants={enterWithY(130)}>
          <Inputs />
        </AnimableInputs>

        <AnimableButton variants={enterWithY(200)}>
          <Button
            data-testid="search"
            full={isMobile}
            onClick={toSearch}
            size={Button.size.extra}
            icon={({ color }) => (
              <Icon name="search" width={18} height={18} color={color} />
            )}
          >
            {t('home.search')}
          </Button>
        </AnimableButton>

        <Languages variants={enterWithY(10)}>
          <Language onClick={() => changeLanguage('en')}>🇺🇸</Language>
          <Language left={15} onClick={() => changeLanguage('pt-BR')}>
            🇧🇷
          </Language>
        </Languages>
      </Header>
    )
  })
)

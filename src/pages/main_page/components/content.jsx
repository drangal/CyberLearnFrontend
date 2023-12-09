import { banner_info } from './banner_info'
import { Bubble } from './bubble'
import { useState, useEffect } from 'react'
import { ChangeColor } from '../../../components/colors'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { AdvisesToUser } from './advise_user'
import { Box } from '@mui/material'
export const ContentMainPage = () => {
  const [character, setCharacter] = useState('Layla')
  const SetCharacter = (character) => {
    setCharacter(character)
    ChangeColor(character)
  }
  const changeCharacter = (direction) => {
    let allKeys = Object.keys(banner_info)
    let currentCharacterIndex = allKeys.indexOf(character)
    if (direction == 1)
      if (allKeys.length - 1 == currentCharacterIndex) {
        SetCharacter(allKeys[0])
      } else {
        SetCharacter(allKeys[currentCharacterIndex + 1])
      }
    else {
      if (0 == currentCharacterIndex) {
        SetCharacter(allKeys[allKeys.length - 1])
      } else {
        SetCharacter(allKeys[currentCharacterIndex - 1])
      }
    }
  }

  useEffect(() => {
    SetCharacter('Layla')
  }, [])
  const Banner = () => {
    const [fade, setFade] = useState(true)
    return (
      <>
        <div className='leftSideBannerMainPage'>
          <div
            className={
              'headerLeftSideContainerPage' + (fade ? ' TextFadeIn' : '')
            }
          >
            {banner_info[character].name}
          </div>
          <div
            className={
              'descriptionLeftSideContainerPage' + (fade ? ' TextFadeIn' : '')
            }
            onAnimationEnd={() => setFade(false)}
          >
            {banner_info[character].description}
          </div>
        </div>
        <div className='rightSideBannerMainPage'>
          <div className='imageInBannerMainPage'>
            <img
              src={banner_info[character].img}
              alt=''
              className={fade ? 'FadeInImg' : ''}
              onAnimationEnd={() => setFade(false)}
            />
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='bannerMainPage'>
        <div
          className='arrowLeftMainPage'
          onClick={() => {
            changeCharacter(-1)
          }}
        >
          <FaArrowLeft />
        </div>
        <div
          className={
            'bannerContainerMainPage ' + character + 'bannerContainerMainPage'
          }
        >
          <div
            className='bubbles'
            style={{ boxShadow: '3px 4px 8px 0px rgba(34, 60, 80, 0.1)' }}
          >
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
            <Bubble></Bubble>
          </div>
          <Banner />
        </div>
        <div
          className='arrowRightMainPage'
          onClick={() => {
            changeCharacter(1)
          }}
        >
          <FaArrowRight />
        </div>
      </div>
      <AdvisesToUser />
      <AboutUs />
      <Box minHeight='100px'></Box>
    </>
  )
}
const AboutUs = () => {
  return (
    <>
      <Box width={'90%'} margin={'auto'} marginTop={'40px'}>
        <Box fontSize={48}>О нас</Box>
        <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
          <Box
            minHeight={'300px'}
            bgcolor={'white'}
            flex={75}
            borderRadius={'10px 0 0 10px'}
            border={1}
            borderColor={'var(--banner-color2)'}
          >
            <Box
              paddingTop={'30px'}
              paddingLeft={'40px'}
              fontSize={56}
              fontWeight={1000}
              fontFamily={'inter'}
              color={'black'}
            >
              <Box display={'flex'} flexDirection={'row'}>
                <Box
                  color={'white'}
                  sx={{
                    textShadow:
                      '-1px -1px 0 var(--banner-color1), 1px -1px 0 var(--banner-color1), -1px 1px 0 var(--banner-color1), 1px 1px 0 var(--banner-color1);'
                  }}
                >
                  E-not
                </Box>
                <Box
                  sx={{
                    textShadow:
                      '-1px -1px 0 var(--banner-color1), 1px -1px 0 var(--banner-color1), -1px 1px 0 var(--banner-color1), 1px 1px 0 var(--banner-color1);'
                  }}
                  color={'white'}
                >
                  GPT
                </Box>
              </Box>
            </Box>
            <Box
              paddingTop={'30px'}
              paddingLeft={'40px'}
              paddingRight={'20px'}
              fontSize={24}
              fontWeight={300}
              fontFamily={'inter'}
              color={'black'}
            >
              Мы - команда Донецкой Народной Республики по спортивному
              программированию. Надеемся и верим в нашу победу!
            </Box>
          </Box>
          <Box
            minHeight={'300px'}
            bgcolor={'white'}
            flex={25}
            borderRadius={'0 10px 10px 0'}
            border={1}
            borderColor={'var(--banner-color2)'}
          >
            <img
              src='http://26.65.125.199:8001/photos/c0172b3f6cd73f9eb478ec65cfe4dd6543855546.png'
              alt=''
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

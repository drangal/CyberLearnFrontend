import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderMainPage } from '../main_page/components/header'
import { useEffect, useState } from 'react'
import { ServerAdress2, ServerPhoto } from '../../components/Api'

const GradientBox = () => {
  return (
    <Box
      height={200}
      borderRadius={'30px 30px 0px 0px'}
      position={'relative'}
      zIndex={4}
      sx={{ background: 'var(--gradient)' }}
    ></Box>
  )
}
const BannerAchivement = ({ data, sDA }) => {
  if (data.draw)
    return (
      <Box
        position={'absolute'}
        zIndex={30}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100vw'}
        height={'100vh'}
        bgcolor={'rgba(245,245,245,0.7)'}
        onClick={() => {
          sDA({ draw: false, item: null })
        }}
      >
        <Box
          minHeight={500}
          minWidth={500}
          bgcolor={'white'}
          borderRadius={20}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Box
            padding={5}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'40px'}
          >
            <Box maxWidth={200} maxHeight={200}>
              <img
                src={data.item.photo}
                alt=''
                width={'100%'}
                height={'100%'}
              />
            </Box>
            <Box fontSize={24} fontWeight={800}>
              {data.item.title}
            </Box>
            <Box fontSize={24} fontWeight={400} maxWidth={400}>
              {data.item.desc}
            </Box>
          </Box>
        </Box>
      </Box>
    )
}
const Achivement = (item, sAD) => {
  return (
    <Box>
      <Box
        width={80}
        height={80}
        onClick={() => {
          sAD({ draw: true, item: item })
        }}
      >
        <img src={item.photo} alt='' width={'100%'} height={'auto'} />
      </Box>
    </Box>
  )
}
const AchivementsBlock = ({ achivements, sAD }) => {
  if (!achivements)
    achivements = [
      {
        title: 'За проверку на почту',
        desc: 'Вы отлично прошли фишинг-проверку на почту, так держать!',
        photo:
          'http://26.65.125.199:8001/photos/1552110d9526da3983f06c69c60f3550044412f1.png'
      },
      {
        title: 'За тесты',
        desc: 'Вы прошли тест без ошибок, так держать!',
        photo:
          'http://26.65.125.199:8001/photos/100514db12c195ad577e2e3e9153a61168914c30.png'
      }
    ]
  return (
    <>
      <Box bgcolor={'white'} paddingX={4}>
        <Box fontFamily={'inter'} fontSize={32}>
          Достижения
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
          gap={'20px'}
        >
          {achivements.map((_, i) => {
            return Achivement(_, sAD)
          })}
        </Box>
      </Box>
    </>
  )
}
const ImageAndTextBox = ({ user, photo, setPhoto }) => {
  const handleChangeImage = (e) => {
    if (!e.currentTarget.files[0]) return
    let formData = new FormData()
    formData.append('file', e.currentTarget.files[0])

    fetch(ServerPhoto + '/uploadPhoto', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(
          ServerAdress2 +
            '/users/edit?user_id=' +
            user.id +
            '&photo=' +
            data.url,
          {
            mode: 'cors',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
            }
          }
        )
          .then((response) => response.json())
          .then((data1) => {
            setPhoto(data.url)
          })
      })
  }
  const styleTextContainer = {
    position: { xs: 'relative', sm: 'relative' },
    top: { xs: -90, sm: 0 },
    marginBottom: { xs: '-90px', sm: 0 },
    bgcolor: { xs: 'white', sm: '' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: { xs: 'center', sm: 'start' }
  }
  const styleImageAndText = {
    width: '150px',
    height: 150,
    borderRadius: '50%',
    zIndex: 4,
    position: { xs: 'relative', sm: 'absolute' },
    top: { sm: -80, xs: 0 },
    left: { sm: 30, xs: 0 },
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <Box position={'relative'}>
      <Box sx={styleTextContainer}>
        <Box sx={styleImageAndText}>
          <Box
            width={35}
            height={35}
            zIndex={9}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'white'}
            borderRadius={'50%'}
            position={'absolute'}
            bottom={0}
            right={10}
          >
            <Box
              width={25}
              height={25}
              borderRadius={'50%'}
              backgroundColor='#A2F2A2'
              sx={{
                boxShadow: '0 0 20px #8FD68F',
                animation: 'Shine 1s ease-out infinite'
              }}
              zIndex={10}
            ></Box>
          </Box>

          <Box
            width={140}
            height={140}
            borderRadius={'50%'}
            position={'absolute'}
            overflow={'hidden'}
          >
            <label htmlFor='imageImport'>
              <img
                width={'100%'}
                height={'100%'}
                src={
                  photo ||
                  'https://sun9-14.userapi.com/impg/Xdv9rwUVcJEDHOwQMs_z12BLmOdj81gbMBchxg/gPIDNOe0YXk.jpg?size=1280x1280&quality=95&sign=55d35aa73db5e1f0d9ca39779fe6cf74&type=album'
                }
                style={{ objectFit: 'cover' }}
                alt=''
              />
            </label>
            <input
              type='file'
              name='imageImport'
              id='imageImport'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={(e) => handleChangeImage(e)}
            />
          </Box>
        </Box>
        <Box
          paddingLeft={'190px'}
          paddingTop={'10px'}
          fontSize={36}
          fontWeight={1000}
          textAlign={{ xs: 'center', sm: 'left' }}
          sx={{ paddingLeft: { xs: '0px', sm: '190px' } }}
        >
          {user?.first_name} {user?.last_name}
        </Box>
        <Box
          paddingLeft={'190px'}
          fontSize={20}
          fontWeight={100}
          sx={{ paddingLeft: { xs: '0px', sm: '190px' } }}
        >
          программист
        </Box>
      </Box>
    </Box>
  )
}

const LevelComponent = ({ userInfo }) => {
  if (userInfo)
    return (
      <Box bgcolor={'white'} padding={'20px'}>
        <Box textAlign={'center'}>
          Level {Math.floor(userInfo.experience / 100) + 1}
        </Box>
        <Box
          width={'100%'}
          height={'6px'}
          bgcolor={'gray'}
          borderRadius={'3px'}
        >
          <Box
            width={`${
              userInfo.experience - 100 * Math.floor(userInfo.experience / 100)
            }%`}
            bgcolor={'yellow'}
            borderRadius={'3px'}
            height={'6px'}
          ></Box>
        </Box>
        <Box textAlign={'center'} fontSize={8} marginTop={'2px'}>
          {userInfo.experience - 100 * Math.floor(userInfo.experience / 100)}
          /100
        </Box>
      </Box>
    )
}

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState()
  const [photo, setPhoto] = useState()
  const [drawAchivement, setDrawAchivement] = useState({
    draw: false,
    item: null
  })
  const FetchUserInfo = (id) => {
    fetch(ServerAdress2 + '/users/get?id=' + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setUserInfo(data.user)
          setPhoto(data.user.photo)
        }
      })
  }
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    FetchUserInfo(id)
  }, [])
  return (
    <>
      <BannerAchivement data={drawAchivement} sDA={setDrawAchivement} />
      <Box maxWidth={1200} margin={'auto'}>
        <HeaderMainPage />
        <Box height={20} />
        <GradientBox />
        <ImageAndTextBox user={userInfo} photo={photo} setPhoto={setPhoto} />
        <LevelComponent userInfo={userInfo} />
        <AchivementsBlock
          achivements={userInfo?.achivements}
          sAD={setDrawAchivement}
        />
        <Box
          paddingTop={4}
          bgcolor={'white'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            component={'button'}
            border={0}
            borderRadius={20}
            paddingX={5}
            paddingY={2}
            bgcolor={'var(--banner-color1)'}
            fontSize={28}
            fontFamily={'Inter'}
            fontWeight={1000}
            color={'white'}
            onClick={() => {
              navigate('/payment')
            }}
          >
            Подписки
          </Box>
        </Box>
        <Box
          bgcolor={'white'}
          borderRadius={'0px 0px 30px 30px'}
          height={30}
        ></Box>
      </Box>
    </>
  )
}

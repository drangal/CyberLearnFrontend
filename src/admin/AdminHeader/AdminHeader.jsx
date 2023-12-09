import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Typography
} from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useNavigate } from 'react-router-dom'
import { ServerAdress2 } from '../../components/Api'
import { useEffect, useState } from 'react'

const handleClickSupport = () => {
  window.open('https://web.telegram.org/a/')
}

export const AdminHeader = () => {
  const [userPhoto, setUserPhoto] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUserPhoto() {
      try {
        const response = await fetch(
          `${ServerAdress2}/users/get?id=${sessionStorage.getItem('id')}`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
            }
          }
        )
        if (response.ok) {
          const json = await response.json()
          setUserPhoto(json.user?.photo)
        } else {
          console.log('WRONG DATA')
        }
      } catch (error) {
        console.log('Ошибки сети или чё-то такое')
      }
    }
    fetchUserPhoto()
  }, [])

  return (
    <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.15)' }}>
      <Container maxWidth='lg'>
        <div className='AdminHeader'>
          <Avatar
            alt='Admin'
            src={userPhoto}
            sx={{
              bgcolor: deepOrange[500],
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              boxShadow: '0px 0px 12px 0px #939393;'
            }}
            onClick={() => {
              navigate(`/profile/${sessionStorage.getItem('id')}`)
            }}
          />
          <Typography
            variant='h5'
            sx={{
              fontSize: {
                lg: 30,
                md: 30,
                sm: 15,
                xs: 15
              }
            }}
          >
            E-notGPT Administration
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '6px'
            }}
          >
            <IconButton aria-label='notifications' color='inherit'>
              <Badge badgeContent={4} color='error' max={99}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label='email'
              color='inherit'
              onClick={handleClickSupport}
            >
              <Badge badgeContent={0} color='error' max={99} variant='dot'>
                <ContactSupportIcon />
              </Badge>
            </IconButton>

            <IconButton
              aria-label='logout'
              color='inherit'
              onClick={() => {
                sessionStorage.removeItem('access_token')
                sessionStorage.removeItem('id')
                navigate('/admin-login')
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </div>
      </Container>
    </Box>
  )
}

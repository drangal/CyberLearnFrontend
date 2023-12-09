import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ServerAdress } from '../../components/Api'

export const SignIn = () => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('username'),
      password: data.get('password')
    })

    try {
      const response = await fetch(`${ServerAdress}/auth/a_token`, {
        method: 'POST',
        body: data
      })

      if (response.ok) {
        const json = await response.json()
        console.log(json.access_token)
        sessionStorage.setItem('access_token', json.access_token)
        sessionStorage.setItem('id', json.id)
        navigate('/admin-panel')
      } else {
        console.log('WRONG DATA')
      }
    } catch (error) {
      console.log('Ошибки сети или чё-то такое')
    }
    // finally {
    //   sessionStorage.setItem('access_token', 'moken_token')
    //   navigate('/admin-panel')
    // }
  }

  useEffect(() => {
    if (sessionStorage.getItem('access_token')) navigate('/admin-panel')
  }, [])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Авторизация
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Адрес эл.почты'
            name='username'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to='/register'>
                {'Ещё нет аккаунта? Зарегистрироваться'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

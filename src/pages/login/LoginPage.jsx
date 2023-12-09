import { Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerAdress } from '../../components/Api'
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const FetchLogin = (e) => {
    e.preventDefault()
    let formData = new FormData(e.currentTarget)
    console.log(formData)
    fetch(ServerAdress + '/auth/token', {
      mode: 'cors',
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status) {
          sessionStorage.setItem('access_token', data.access_token)
          sessionStorage.setItem('id', data.id)
          navigate('/')
        }
      })
  }
  const [error, setError] = useState('')
  const [login, setLogin] = useState('')
  const handleChangeLogin = (event) => {
    setLogin(event.target.value)
    let val = event.target.value
    if (event.target.value == '') setError('Поле не может быть пустым')
    else if (!validateEmail(val)) setError('Проверьте почту')
    else setError('')
  }

  const [password, setPassword] = useState('')
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <Box
        width={'100%'}
        height={'95vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <>
          <Box
            component={'form'}
            height={500}
            display={'flex'}
            gap={3}
            flexDirection={'column'}
            justifyContent={'center'}
            onSubmit={FetchLogin}
          >
            <TextField
              id='username'
              label='Username\e-mail'
              value={login}
              autoComplete='email'
              onChange={handleChangeLogin}
              type='email'
              name='username'
              error={error !== ''}
              helperText={error}
            />
            <TextField
              id='password'
              label='Password'
              name='password'
              value={password}
              onChange={handleChangePassword}
              type='password'
            />
            <Button variant='contained' color='primary' type='submit'>
              Войти
            </Button>
            <Box
              onClick={() => {
                navigate('/register')
              }}
            >
              Нет аккаунта? Создать!
            </Box>
          </Box>
        </>
      </Box>
    </>
  )
}

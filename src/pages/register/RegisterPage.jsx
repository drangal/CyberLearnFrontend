import { Box, TextField, Button } from '@mui/material'
import { ServerAdress } from '../../components/Api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const FetchRegister = (e) => {
    e.preventDefault()
    let formData = new FormData(e.currentTarget)
    let json = JSON.stringify({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      role: 'user',
      password: formData.get('password')
    })
    console.log(formData)
    fetch(ServerAdress + '/auth/register', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
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
  const [name, setName] = useState('')
  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const [surname, setSurname] = useState('')
  const handleChangeSurname = (event) => {
    setSurname(event.target.value)
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
            onSubmit={FetchRegister}
          >
            <TextField
              id='name'
              label='Имя'
              name='first_name'
              value={name}
              onChange={handleChangeName}
              type='text'
            />
            <TextField
              id='surname'
              label='Фамилия'
              name='last_name'
              value={surname}
              onChange={handleChangeSurname}
              type='text'
            />
            <TextField
              id='email'
              label='Username\e-mail'
              value={login}
              name='email'
              onChange={handleChangeLogin}
              type='email'
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
                navigate('/login')
              }}
            >
              Есть аккаунт? Войти
            </Box>
          </Box>
        </>
      </Box>
    </>
  )
}

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography
} from '@mui/material'
import { ServerAdress2 } from '../../../components/Api'
import { useState } from 'react'

export const Lections = () => {
  const [open, setOpen] = useState(false)
  const [severityValue, setSeverityValue] = useState('success')
  const [alertText, setAlertText] = useState('Лекция добавлена успешно!')

  const handleClick = () => {
    const name = document.getElementById('name_lection').value
    const text = document.getElementById('text_lection').value
    console.log(sessionStorage.getItem('access_token'))
    fetch(ServerAdress2 + '/topics/create', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: name, text: text })
    })
      .then((response) => response.json())
      .then((data) => {
        setOpen(true)
        setSeverityValue('success')
        setAlertText('Информация добавлена успешно!')
        console.log(data)
      })
      .catch(function (err) {
        severityValue('error')
        setAlertText('Ошибка добавления данных')
        console.log(err.message)
      })

    console.log(name, text)
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 1, width: '50vw' }}>
      <Typography variant='h4' gutterBottom>
        Лекции
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '4px'
        }}
      >
        <Box display={'flex'} gap={'20px'} flexDirection={'column'}>
          <Box display={'flex'} flexDirection={'row'} gap={2}>
            <Box component={'label'}>Введите название лекции</Box>
            <Box component={'input'} type='text' id='name_lection'></Box>
          </Box>
          <Box display={'flex'} flexDirection={'row'} gap={2}>
            <Box component={'label'}>Введите текст лекции</Box>
            <Box component={'textarea'} type='text' id='text_lection'></Box>
          </Box>
          <Box display={'flex'} flexDirection={'row'} gap={2}>
            <Button onClick={handleClick}>Отправить</Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={severityValue}
          sx={{ width: '100%' }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </Container>
  )
}

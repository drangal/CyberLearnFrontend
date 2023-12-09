import {
  Alert,
  Button,
  Container,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import { ServerAdress2 } from '../../../components/Api'
import { useState } from 'react'

export const DangersPage = () => {
  const [open, setOpen] = useState(false)
  const [severityValue, setSeverityValue] = useState('success')
  const [alertText, setAlertText] = useState('Информация добавлена успешно!')

  const handleClick = () => {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    fetch(ServerAdress2 + '/alerts/setLast', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, description: description })
    })
      .then((response) => response.json())
      .then((data) => {
        setOpen(true)
        setSeverityValue('success')
        setAlertText('Информация добавлена успешно!')
        console.log(data)
      })
      .catch(function (err) {
        setOpen(true)
        setSeverityValue('error')
        setAlertText('Ошибка добавления данных')
        console.log(err.message)
      })
    console.log(title, description)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 1, width: '50vw' }}>
      <Typography variant='h4' gutterBottom>
        Угрозы
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
        <Typography variant='h10'>Название угрозы:</Typography>
        <TextareaAutosize id='title' minRows={1} placeholder='Название' />
        <Typography variant='h10'>Содержание:</Typography>
        <TextareaAutosize
          id='description'
          minRows={3}
          placeholder='Вводите тут...'
        />
        <Button onClick={handleClick}>Отправить</Button>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severityValue}
          sx={{ width: '100%' }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </Container>
  )
}

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount }
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    'Boston, MA',
    'MC ⠀•••• 1253',
    100.81
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79
  )
]

function preventDefault(event) {
  event.preventDefault()
}

export const AllOrders = () => {
  return (
    <>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Recent Orders
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align='right'>Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align='right'>{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </>
  )
}

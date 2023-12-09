import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
  Button
} from '@mui/material'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import { useEffect, useMemo, useState } from 'react'
import { ServerAdress2 } from '../../../components/Api'

// const usersTests = [
//   { id: 6, themes: { cybersecurity: 0, phishing: 1, carding: 0 } },
//   { id: 7, themes: { cybersecurity: 1, phishing: 1, carding: 0 } }
// ]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    label: 'ID'
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Дата создания аккаунта'
  },
  {
    id: 'experience',
    numeric: true,
    label: 'Рейтинг'
  }
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...{
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        }
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Общая информация
      </Typography>
    </Toolbar>
  )
}

export function Users() {
  const [userIdForDialog, setUserIdForDialog] = useState()
  const [croppedRows, setCroppedRows] = useState([])
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - croppedRows.length) : 0

  const visibleRows = useMemo(
    () =>
      stableSort(croppedRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  )

  const handleClickOpenDailog = (event, id) => {
    setUserIdForDialog(id)
    setOpenDialog(true)
  }

  const handleCloseDailog = () => {
    setUserIdForDialog()
    setOpenDialog(false)
  }

  // const parseObject = (obj) => {
  //   for (const [key, value] of Object.entries(obj)) {
  //     return (
  //       <div>
  //         `${key}: ${value}`
  //       </div>
  //     )
  //   }
  // }

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch(`${ServerAdress2}/users/getAll`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
          }
        })
        if (response.ok) {
          const json = await response.json()
          const filteredUsers = json.users.filter((user) => {
            return user.id != sessionStorage.getItem('id')
          })

          const createdData = filteredUsers.map((user) => ({
            id: user.id,
            created_at: user.created_at,
            experience: user.experience
          }))

          setCroppedRows(createdData)
        } else {
          console.log('WRONG DATA')
        }
      } catch (error) {
        console.log('Ошибки сети или чё-то такое')
      }
    }
    fetchAllUsers()
  }, [])

  return (
    <div>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Paper
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              stickyHeader
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={croppedRows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClickOpenDailog(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='normal'
                      >
                        {row.id}
                      </TableCell>
                      <TableCell component='th' scope='row' padding='normal'>
                        {row.created_at.slice(
                          0,
                          row.created_at.lastIndexOf('.')
                        )}
                      </TableCell>
                      <TableCell align='right'>{row.experience}</TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={croppedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDailog}>
        <DialogTitle>Подробности о пользователе</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, введите пароль своего аккаунта, для подтверждения, что
            вы администратор
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Пароль'
            type='password'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDailog}>Отменить</Button>
          <Button onClick={handleCloseDailog}>Продолжить</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

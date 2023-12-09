import { Box } from '@mui/material'
import { HeaderMainPage } from '../main_page/components/header'

import * as React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const DropDown = ({ age, handleChange }) => {
  return (
    <Box width={'300px'}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Тариф</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          label='Age'
          onChange={handleChange}
        >
          <MenuItem value={1}>до 50</MenuItem>
          <MenuItem value={2.5}>до 150</MenuItem>
          <MenuItem value={7}>до 500</MenuItem>
          <MenuItem value={12.5}>до 1000</MenuItem>
          <MenuItem value={17.5}>безлимит</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
export const PaymentPage = () => {
  const [age, setAge] = React.useState(1)

  const handleChange = (event) => {
    setAge(event.target.value)
  }
  return (
    <>
      <Box maxWidth={1200} margin={'auto'}>
        <HeaderMainPage />
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={'20px'}
          marginTop={5}
          paddingY={10}
          borderRadius={5}
          bgcolor={'white'}
        >
          <Box fontFamily={'inter'} fontSize={48}>
            Оплата подписки
          </Box>
          <Box paddingTop={3}>
            <DropDown age={age} handleChange={handleChange} />
          </Box>
          <Box width={'300px'}>
            <Box
              paddingY={3}
              paddingX={2}
              borderRadius={3}
              fontWeight={300}
              fontSize={48}
              textAlign={'center'}
            >
              К оплате{' '}
              <b>
                <Box fontWeight={1000} fontFamily={'inter'}>
                  {+age * 100000}
                </Box>
              </b>{' '}
              рублей
            </Box>
          </Box>
          <Box width={'300px'}>
            <Box
              paddingY={3}
              paddingX={6}
              borderRadius={3}
              border={1}
              textAlign={'center'}
            >
              Оплатить
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

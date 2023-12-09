import { Box } from '@mui/material'
import { ServerAdress2 } from './Api'
import { useEffect, useState } from 'react'
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

export const LastAlert = () => {
  const [lastAlert, setLastAlert] = useState()
  useEffect(() => {
    fetchLastAlert()
  }, [])
  const fetchLastAlert = () => {
    fetch(ServerAdress2 + '/alerts/last', {})
      .then((response) => response.json())
      .then((json) => {
        setLastAlert(json.last_alert)
      })
  }
  if (lastAlert)
    return (
      <>
        <Box
          display={'flex'}
          flexDirection={'row'}
          bgcolor={'orange'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingLeft={'70px'}
          paddingY={'10px'}
          onClick={() => {
            setLastAlert()
          }}
        >
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <FaExclamationTriangle size={60} />
            <Box padding={10} bgcolor={'orange'} paddingRight={10}>
              <Box fontSize={26}>{lastAlert.title}</Box>
              <Box fontSize={18}>{lastAlert.description}</Box>
            </Box>
          </Box>
          <Box fontSize={12} paddingRight={10}>
            {<FaTimes size={40} />}
          </Box>
        </Box>
      </>
    )
}

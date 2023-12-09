import { Box } from '@mui/material'
import Alert from '../images/alert_denied.png'
export default function NotFoundPage() {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        height={'95vh'}
      >
        <Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            height={'90vh'}
          >
            <img
              src={Alert}
              alt=''
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

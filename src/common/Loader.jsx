import { CircularProgress, Container } from '@mui/material'

export const Loader = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <CircularProgress />
    </Container>
  )
}

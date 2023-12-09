import { Box, Card, CardContent, Container } from '@mui/material'

export const CorporationPage = () => {
  return (
    <Container maxWidth={'sm'} sx={{ mt: 2 }}>
      <Box display={'flex'} flexDirection={'row'} gap={10} mb={10}>
        <Box fontSize={24} fontWeight={'bold'}>
          Urcorp
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={2}
          fontSize={12}
          alignItems={'flex-end'}
          color={'GrayText'}
        >
          <Box>Home</Box>
          <Box>Product</Box>
          <Box>Pricing</Box>
          <Box>Contact</Box>
        </Box>
      </Box>
      <Box>
        <Box>
          <Box textTransform={'uppercase'}>CyberLearn</Box>
          <Box>
            We know how large objects will act, but things on a small scale.
          </Box>
          <Box>
            <Box>Get Quote Now</Box>
            <Box>Learn More</Box>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={1} flexWrap={'wrap'}>
          <Card variant='outlined'>
            <CardContent>
              <Box>pic</Box>
              <Box>Digital Marketing</Box>
              <Box>We focus on ergonomics and meeting you where you work. </Box>
            </CardContent>
          </Card>
          <Card variant='outlined'>
            <CardContent>
              <Box>
                <Box>pic</Box>
                <Box>National top 50 firms</Box>
                <Box>
                  Just type what&apos;s on your mind and we&apos;ll get you
                  there.
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card variant='outlined'>
            <CardContent>
              <Box>
                <Box>pic</Box>
                <Box>Digital Marketing</Box>
                <Box>the quick fox jumps over the lazy dog</Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

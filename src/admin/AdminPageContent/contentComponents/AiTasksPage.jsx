import { Box, Container, Paper, Typography } from '@mui/material'
import { ServerFile } from '../../../components/Api'
import { useState } from 'react'

export const AiTasksPage = () => {
  const [file, setFile] = useState()
  const [text, setText] = useState()
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadClick = () => {
    if (!file) {
      return
    }
    let formData = new FormData()
    formData.append('file', file)

    fetch(ServerFile + '/uploadfile/', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => setText(data.response))
      .catch((err) => console.log(err))
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 1, width: '50vw' }}>
      <Typography variant='h4' gutterBottom>
        Составление вопросника по загруженной лекции
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {text && (
          <Box mb={2}>
            {text.split('\n').map((elem, i) => (
              <div key={i}>
                {elem}
                <br />
              </div>
            ))}
          </Box>
        )}
        <Box display={'flex'} flexDirection={'column'}>
          <input
            type='file'
            accept='
    application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            onChange={handleFileChange}
          />

          <button onClick={handleUploadClick}>Upload</button>
        </Box>
      </Paper>
    </Container>
  )
}

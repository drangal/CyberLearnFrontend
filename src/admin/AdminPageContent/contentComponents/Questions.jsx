import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Fab,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import NumericInput from 'react-numeric-input'
import AddIcon from '@mui/icons-material/Add'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import { ServerAdress2 } from '../../../components/Api'

export const Questions = () => {
  const [open, setOpen] = useState(false)
  const [severityValue, setSeverityValue] = useState('success')
  const [alertText, setAlertText] = useState('Информация добавлена успешно!')
  const [questionID, setQuestionID] = useState(-1)
  const [categories, setCategories] = useState()
  const [ageCategories, setAgeCategories] = useState()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('')
  const [questions, setQuestions] = useState([
    { question_id: questionID, answer: '', correct: false },
    { question_id: questionID, answer: '', correct: false },
    { question_id: questionID, answer: '', correct: false },
    { question_id: questionID, answer: '', correct: false },
    { question_id: questionID, answer: '', correct: false }
  ])
  const [numberOfVisibleQuestions, setNumberOfVisibleQuestions] = useState(2)

  const handleClickSend = () => {
    const weight = document.getElementById('weight').value
    const textQuestion = document.getElementById('text_question').value
    fetch(ServerAdress2 + '/tests/addQuestion', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test_id: 1,
        text_question: textQuestion,
        weight: weight,
        category_age_id: selectedAgeCategory
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const qid = data.question.id
        fetch(ServerAdress2 + '/tests/bindCategory', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question_id: qid,
            category_id: selectedCategory
          })
        })
          .then((response) => response.json())
          .then((data) => {
            for (let i = 0; i < numberOfVisibleQuestions; i++) {
              fetch(ServerAdress2 + '/tests/addVariant', {
                method: 'POST',
                headers: {
                  Authorization:
                    'Bearer ' + sessionStorage.getItem('access_token'),
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  question_id: qid,
                  answer: questions[i].answer,
                  correct: questions[i].correct
                })
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log('Ответ: ' + data)
                })
                .catch(function (err) {
                  console.log(err.message)
                })
            }
            console.log('Категория: ' + data)
          })
          .catch(function (err) {
            console.log(err.message)
          })
        setOpen(true)
        setSeverityValue('success')
        setAlertText('Информация добавлена успешно!')
        console.log('Вопрос: ' + data)
      })
      .catch(function (err) {
        setOpen(true)
        setSeverityValue('error')
        setAlertText('Ошибка добавления данных')
        console.log(err.message)
      })
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleAddClick = () => {
    if (numberOfVisibleQuestions <= 5)
      setNumberOfVisibleQuestions(numberOfVisibleQuestions + 1)
  }

  const handleDeleteClick = () => {
    if (numberOfVisibleQuestions > 2) {
      setNumberOfVisibleQuestions(numberOfVisibleQuestions - 1)
      const newQuestionList = questions.map((question, i) => {
        if (i === numberOfVisibleQuestions - 1) {
          const resetQuestion = {
            question_id: questionID,
            answer: '',
            correct: false
          }
          return resetQuestion
        }
        return question
      })
      setQuestions(newQuestionList)
    }
  }

  // TODO только один и только обязательный ответ
  const handleClickCheckbox = (event, index) => {
    const newQuestionList = questions.map((question, i) => {
      if (i === index) {
        const correctValue = event.target.value == 'on'
        const resetQuestion = {
          question_id: questionID,
          answer: document.getElementById('question' + index).value,
          correct: correctValue != question.correct
        }
        return resetQuestion
      }
      return question
    })
    setQuestions(newQuestionList)
    console.log(document.getElementById('question' + index).value)
  }

  useEffect(() => {
    fetch(`${ServerAdress2}/tests/getAgeCategories`, {})
      .then((response) => response.json())
      .then((json) => {
        setAgeCategories(json.ageCategories)
      })
      .catch(function (err) {
        console.log(err.message)
      })

    fetch(`${ServerAdress2}/tests/getCategories`, {})
      .then((response) => response.json())
      .then((json) => {
        setCategories(json.categories)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }, [])

  return (
    <Container maxWidth='lg' sx={{ mt: 1, width: '50vw' }}>
      <Typography variant='h4' gutterBottom>
        Список вопросов и их добавление
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
        <Typography variant='h10'>Выберите направление:</Typography>
        <Select
          id='category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          autoWidth
        >
          {categories &&
            categories.map((category, i) => (
              <MenuItem value={category.id} key={i}>
                {category.title}
              </MenuItem>
            ))}
        </Select>
        <Typography variant='h10'>Выберите возрастную категорию:</Typography>
        <Select
          id='ageCategory'
          value={selectedAgeCategory}
          onChange={(e) => setSelectedAgeCategory(e.target.value)}
          autoWidth
        >
          {ageCategories &&
            ageCategories.map((ageCategory, i) => (
              <MenuItem value={ageCategory.id} key={i}>
                {`от ${ageCategory.age_from} до ${ageCategory.age_to}`}
              </MenuItem>
            ))}
        </Select>
        <Typography variant='h10'>Укажите сложность от 0 до 100:</Typography>
        <Box sx={{ mb: '6px' }}>
          <NumericInput id='weight' step={10} min={0} max={100} value={50} />
        </Box>

        <Typography variant='h10'>Текст вопроса:</Typography>
        <TextareaAutosize
          id='text_question'
          minRows={3}
          placeholder='Вводите тут...'
        />
        <Typography variant='h10'>Ответы:</Typography>
        <Stack spacing={2} mb={'4px'}>
          {questions.map(
            (question, i) =>
              numberOfVisibleQuestions < i + 1 || (
                <Box key={i} display={'flex'} flexDirection={'column'}>
                  <TextField fullWidth id={'question' + i} />
                  <Checkbox
                    checked={questions[i].correct}
                    onClick={(e) => {
                      handleClickCheckbox(e, i)
                    }}
                  />
                  <Divider />
                </Box>
              )
          )}
        </Stack>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Fab
            size='small'
            color='primary'
            aria-label='add'
            onClick={handleAddClick}
          >
            <AddIcon />
          </Fab>
          <Fab
            size='small'
            color='secondary'
            aria-label='delete'
            onClick={handleDeleteClick}
          >
            <RemoveOutlinedIcon />
          </Fab>
        </Box>

        <Button onClick={handleClickSend}>Отправить</Button>
      </Paper>
      {/* TODO снэкбар подстроить под каждый запрос - подключить запросы */}
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

/*
структура добавления вопроса
{
  "test_id": 0,
  "text_question": "string",
  "weight": 0,
  "category_age_id": 0
}

структура добавления ответа
{
  "question_id": 0,
  "answer": "string",
  "correct": true
}

структура добавления категории к вопросу
{
  "question_id": 0,
  "category_id": 0
}

получение всех категорий
/tests/getCategories

получение возрастных категорий
/tests/getAgeCategories
*/

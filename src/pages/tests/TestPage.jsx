import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { ServerAdress2 } from '../../components/Api'
import { TOKEN } from '../../components/TokenController'
let start_time = +new Date()
let end_time = +new Date()
export const TestPage = () => {
  const [testFromApi, setTestFromApi] = useState()
  const [currStage, setCurrStage] = useState(0)

  const fetchTestData = () => {
    let test = []
    fetch(ServerAdress2 + `/tests/getRecommendations`, {
      headers: { Authorization: 'Bearer ' + TOKEN() }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.result.length)
        if (json.result.length != 0) {
          console.log(json)
          fetch(
            ServerAdress2 +
              `/tests/getQuestionByCategory?category_id=${
                json.result[0].topic
              }&count=${5}`
          )
            .then((response) => response.json())
            .then((json1) => {
              json1.questions.map((_) => {
                test.push(_)
              })
              fetch(
                ServerAdress2 +
                  `/tests/getQuestionByCategory?category_id=${
                    json.result[1].topic
                  }&count=${3}`
              )
                .then((response) => response.json())
                .then((json1) => {
                  json1.questions.map((_) => {
                    test.push(_)
                  })
                  function func(a, b) {
                    return 0.5 - Math.random()
                  }
                  test = test.sort(func)
                  console.log(test)
                  setTestFromApi(test)
                })
            })
        } else {
          fetch(
            ServerAdress2 +
              `/tests/getQuestionByCategory?category_id=${1}&count=${2}`
          )
            .then((response) => response.json())
            .then((json1) => {
              json1.questions.map((_) => {
                test.push(_)
              })
              fetch(
                ServerAdress2 +
                  `/tests/getQuestionByCategory?category_id=${2}&count=${3}`
              )
                .then((response) => response.json())
                .then((json1) => {
                  json1.questions.map((_) => {
                    test.push(_)
                  })
                  function func(a, b) {
                    return 0.5 - Math.random()
                  }
                  test = test.sort(func)
                  console.log(test)
                  setTestFromApi(test)
                })
            })
        }
      })
  }
  useEffect(() => {
    fetchTestData()
  }, [])
  if (testFromApi)
    return (
      <Box width={'90%'} margin={'auto'} marginTop={10}>
        <HeadOfComponent radius={20} height={40} />
        <Title name={'Комплексное тестирование'} />
        <TestForm
          test={testFromApi}
          id_question={currStage}
          sCS={setCurrStage}
        />
        <BottomCircles
          lenght={testFromApi.length}
          current={currStage}
          sCS={setCurrStage}
        />
        <EndOfComponent radius={20} height={40} />
      </Box>
    )
}
const VariantAnswer = ({ id, answer, selected, setSelected }) => {
  return (
    <Box fontSize={18} padding={2}>
      <input
        type='radio'
        id={'radio' + id}
        name='variant_answer'
        defaultChecked={false}
        onClick={(e) => {
          if (selected != id) setSelected(id)
        }}
      ></input>
      <label htmlFor={'radio' + id}>{answer.answer}</label>
    </Box>
  )
}
const sendChoosedVariant = (q_id, a_id, a_time) => {
  fetch(
    ServerAdress2 +
      '/tests/checkAnswer?question_id=' +
      q_id +
      '&answer_id=' +
      a_id +
      '&answer_time=' +
      a_time,
    { method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN() } }
  )
    .then((r) => r.json())
    .then((json) => {
      console.log(json)
    })
}
const FormTask = ({ title, test, currStage, setCurrStage }) => {
  const [selected, setSelected] = useState(0)
  if (test)
    return (
      <Box>
        <Box fontSize={24} fontWeight={700} marginBottom={1}>
          {title}
        </Box>
        <Box
          fontSize={24}
          fontWeight={700}
          component={'form'}
          marginY={'10px'}
          minHeight={300}
        >
          {test[currStage].answers.map((_, i) => {
            return (
              <VariantAnswer
                id={i}
                answer={_}
                selected={selected}
                setSelected={setSelected}
              />
            )
          })}
        </Box>
        <Button
          onClick={() => {
            end_time = +new Date()
            sendChoosedVariant(
              test[currStage].id,
              test[currStage].answers[selected].id,
              Math.floor((end_time - start_time) / 1000)
            )
            start_time = +new Date()
            setCurrStage(currStage + 1)
          }}
        >
          Следующий вопрос
        </Button>
      </Box>
    )
}

const TestForm = ({ test, id_question, sCS }) => {
  if (test)
    return (
      <Box
        display={'flex'}
        paddingX={'20px'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'left'}
        bgcolor={'white'}
      >
        <FormTask
          title={test[id_question].text_question}
          test={test}
          currStage={id_question}
          setCurrStage={sCS}
        />
      </Box>
    )
}

const HeadOfComponent = ({ radius, height }) => {
  return (
    <Box
      borderRadius={`${radius}px ${radius}px 0 0`}
      height={height + 'px'}
      bgcolor={'white'}
    />
  )
}
const EndOfComponent = ({ radius, height }) => {
  return (
    <Box
      borderRadius={`0 0 ${radius}px ${radius}px`}
      height={height + 'px'}
      bgcolor={'white'}
    />
  )
}

const Title = ({ name }) => {
  if (name)
    return (
      <Box
        textAlign={'center'}
        fontFamily={'Inter'}
        fontWeight={700}
        fontSize={'40px'}
        bgcolor={'white'}
        paddingBottom={2}
      >
        {name}
      </Box>
    )
}
const Circles = ({ count, selected, sCS }) => {
  return Array(count)
    .fill(0)
    .map((_, i) => {
      if (i == selected)
        return (
          <Box
            key={i}
            borderRadius={'50%'}
            bgcolor={'lightgreen'}
            height={10}
            width={10}
          ></Box>
        )

      return (
        <Box
          key={i}
          borderRadius={'50%'}
          bgcolor={'gray'}
          height={10}
          width={10}
        ></Box>
      )
    })
}
const BottomCircles = ({ lenght, current, sCS }) => {
  if (lenght)
    return (
      <Box
        height={20}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={'white'}
      >
        <Box
          display={'flex'}
          width={'100%'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'20px'}
        >
          <Circles count={lenght} selected={current} sCS={sCS} />
        </Box>
      </Box>
    )
}

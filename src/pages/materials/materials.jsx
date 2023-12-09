import { Box } from '@mui/material'
import { HeaderMainPage } from '../main_page/components/header'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { ServerAdress2 } from '../../components/Api'

const LectionHeader = ({ title }) => {
  return (
    <Box fontSize={48} textAlign={'center'} marginTop={'20px'}>
      {title}
    </Box>
  )
}

const LectionBody = ({ text }) => {
  const inner = { __html: text }
  return (
    <Box
      fontSize={20}
      fontFamily={'Inter'}
      margin={'auto'}
      marginTop={'10px'}
      width={'80%'}
      dangerouslySetInnerHTML={inner}
    ></Box>
  )
}

const CommentBlock = ({ comment }) => {
  if (comment)
    return (
      <Box
        minHeight={50}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'start'}
        //border={1}
        //padding={2}
        paddingBottom={'5px'}
        borderRadius={'10px'}
        borderColor={'var(--banner-color1)'}
      >
        <Box
          maxHeight={50}
          maxWidth={50}
          borderRadius={'50%'}
          overflow={'hidden'}
          marginRight={3}
        >
          <img
            src={comment?.user.photo}
            alt=''
            width={'100%'}
            height={'auto'}
          />
        </Box>
        <Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'left'}
            alignItems={'center'}
            gap={'20px'}
          >
            <Box fontFamily={'Inter'} fontWeight={700}>
              {comment?.user.first_name}
            </Box>
            <Box fontFamily={'Inter'} fontSize={'10px'}>
              {comment?.time}
            </Box>
          </Box>
          <Box fontFamily={'Inter'} fontWeight={300}>
            {comment.message}
          </Box>
        </Box>
      </Box>
    )
}

const LectionComments = ({ comments }) => {
  return (
    <>
      <Box paddingBottom={'40px'} width={'80%'} margin={'auto'}>
        <Box fontSize={45} marginTop={3}>
          Комментарии
        </Box>
        <Box
          marginTop={3}
          minHeight={10}
          display={'flex'}
          flexDirection={'column'}
          gap={'5px'}
        >
          {comments?.map((_) => {
            return <CommentBlock comment={_} />
          })}
        </Box>
      </Box>
    </>
  )
}

const handleClick = (id, fetchData) => {
  const json = {
    topic_id: +id,
    message: document.getElementById('textarea_comment').value
  }
  fetch(ServerAdress2 + '/topics/sendComment', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then((response) => response.json())
    .then((json) => {
      fetchData(id)

      console.log(json)
    })
}

const WriteCommentSection = ({ id, fetchData }) => {
  return (
    <Box paddingBottom={'50px'} display={'flex'} flexDirection={'row'}>
      <Box
        component={'textarea'}
        type='text'
        id='textarea_comment'
        padding={2}
        borderRadius={'20px 0 0 20px'}
        minHeight={'50px'}
        flex={85}
        border={0}
      ></Box>
      <Box
        component={'button'}
        type='submit'
        flex={15}
        minHeight={'50px'}
        borderRadius={'0 20px 20px 0'}
        border={0}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          handleClick(id, fetchData)

          //window.location.reload()
        }}
      >
        <FaArrowRight size={'40px'} />
      </Box>
    </Box>
  )
}

export const MaterialPage = () => {
  const { id_page } = useParams()
  const [data, setData] = useState()

  const fetchData = (id) => {
    fetch(ServerAdress2 + '/topics/getById?id=' + id)
      .then((response) => response.json())
      .then((json) => {
        function compare(a, b) {
          if (a.id < b.id) {
            return -1
          }
          if (a.id > b.id) {
            return 1
          }
          return 0
        }
        json.topic?.comments.sort(compare)
        setData(json.topic)
      })
  }

  useEffect(() => {
    fetchData(id_page)
  }, [])
  return (
    <Box width={'90%'} margin={'auto'}>
      <HeaderMainPage />
      <LectionHeader title={data?.title} />
      <LectionBody text={data?.text} />
      <LectionComments comments={data?.comments} />
      <WriteCommentSection id={id_page} fetchData={fetchData} />
    </Box>
  )
}

export const MaterialPageNoId = () => {
  let navigate = useNavigate()
  const [data, setData] = useState()

  const fetchData = () => {
    fetch(ServerAdress2 + '/topics/getAll')
      .then((response) => response.json())
      .then((json) => {
        setData(json.topics)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  if (data)
    return (
      <Box width={'90%'} margin={'auto'}>
        <HeaderMainPage />
        <Box
          paddingTop={'40px'}
          display={'flex'}
          flexDirection={'row'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={'center'}
          gap='20px'
        >
          {data.map((_) => {
            return (
              <Box
                minWidth={250}
                minHeight={50}
                paddingTop={'20px'}
                padding={10}
                border={1}
                paddingX={3}
                boxShadow={'3px 4px 8px 0px rgba(34, 60, 80, 0.1);'}
                borderRadius={'10px'}
                fontFamily={'Inter'}
                fontSize={45}
                fontWeight={1000}
                onClick={() => {
                  navigate('/materials/' + _.id)
                }}
                textAlign={'center'}
              >
                {_.title}
              </Box>
            )
          })}
        </Box>
      </Box>
    )
}

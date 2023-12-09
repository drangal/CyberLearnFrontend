import { useNavigate } from 'react-router-dom'
import { FaUser, FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { ServerAdress2 } from '../../../components/Api'
import { Link } from 'react-router-dom'
export const HeaderMainPage = () => {
  const navigate = useNavigate()
  const id = sessionStorage.getItem('id')
  const LoginButtons = () => {
    const [userInfo, setUserInfo] = useState()
    const FetchUserData = (id) => {
      fetch(ServerAdress2 + '/users/get?id=' + id, {
        mode: 'cors',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data)
        })
    }
    useEffect(() => {
      if (sessionStorage.getItem('access_token')) FetchUserData(id)
    }, [])
    if (userInfo)
      return (
        <div className='login_buttonsMainPage'>
          <Link
            to={'/profile/' + userInfo.user.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            className='loginbutton_buttonsMainPage'
            onClick={() => {
              navigate('/profile/' + userInfo.user.id)
            }}
          >
            Привет, {userInfo && userInfo.user.first_name}
          </Link>
          <div
            className='signinbutton_buttonsMainPage'
            onClick={() => {
              sessionStorage.clear()
              navigate('/')
            }}
          >
            Выйти
          </div>
        </div>
      )
    else
      return (
        <div className='login_buttonsMainPage'>
          <Link
            to='/login'
            className='loginbutton_buttonsMainPage'
            onClick={() => navigate('/login')}
          >
            Войти
          </Link>
          <Link
            to='/register'
            className='signinbutton_buttonsMainPage'
            onClick={() => navigate('/register')}
          >
            Регистрация
          </Link>
        </div>
      )
  }
  return (
    <header className='headerMainPage'>
      <div className='iconsMainPage'>
        <div className='iconMainPage icon_profileMainPage'>
          <FaUser />
        </div>
        <div className='iconMainPage icon_addMainPage'>
          <FaPlus />
        </div>
      </div>
      <div className='buttonsMainPage'>
        <Link
          to='/'
          className='button_centerMainPage activeMainPage'
          onClick={() => navigate('/')}
        >
          Главная
        </Link>
        <Link to='/test' className='button_centerMainPage'>
          Тест
        </Link>
        <Link
          to='/materials'
          className='button_centerMainPage'
          onClick={() => navigate('/materials')}
        >
          Материалы
        </Link>
      </div>
      <LoginButtons />
    </header>
  )
}

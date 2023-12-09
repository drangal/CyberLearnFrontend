import './css/colors.css'
import './css/MainPage.css'
import { HeaderMainPage } from './components/header'
import { ContentMainPage } from './components/content'
import { AdvisesToUser } from './components/advise_user'
import { LastAlert } from '../../components/LastAlert'

const MainPage = () => {
  return (
    <>
      <LastAlert />
      <div className='wrapper'>
        <HeaderMainPage />
        <ContentMainPage />
      </div>
    </>
  )
}

export default MainPage

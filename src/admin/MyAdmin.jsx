import { Box, CssBaseline } from '@mui/material'
import './MyAdmin.css'
import { AdminHeader } from './AdminHeader/AdminHeader'
import { AdminSideMenu } from './AdminSideMenu/AdminSideMenu'
import { AdminPageContent } from './AdminPageContent/AdminPageContent'
import { AdminFooter } from './AdminFooter/AdminFooter'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../common/Loader'

export const MyAdmin = () => {
  const [isLoading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) navigate('/admin-login')
    else setLoading(false)
  }, [])

  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='Admin'>
          {' '}
          <AdminHeader />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flex: '1'
            }}
          >
            <AdminSideMenu />
            <AdminPageContent />
          </Box>
          <AdminFooter />
        </div>
      )}
    </>
  )
}

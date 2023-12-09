import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import PlayLessonIcon from '@mui/icons-material/PlayLesson'
import { useNavigate } from 'react-router-dom'

export const AdminSideMenu = () => {
  const navigate = useNavigate()

  return (
    <div className='AdminSideMenu'>
      <nav aria-label='main mailbox folders'>
        <List sx={{ bgcolor: 'background.paper' }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-panel/')}>
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Общая статистика' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-panel/questions')}>
              <ListItemIcon>
                <AssignmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Вопросы' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-panel/dangers')}>
              <ListItemIcon>
                <CoronavirusOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Угрозы КБ' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-panel/users')}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Пользователи' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-panel/lections')}>
              <ListItemIcon>
                <PlayLessonIcon />
              </ListItemIcon>
              <ListItemText primary='Лекции' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin-panel/AI')}>
              <ListItemIcon>
                <SmartToyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Помощь ИИ' />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </div>
  )
}

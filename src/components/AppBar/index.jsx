import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'

import { ReactComponent as TaskoIcon } from '~/assets/logo.svg'

import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

import TextField from '@mui/material/TextField'

import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'

function AppBar() {
  return (
    <>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.taskoCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        gap: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <AppsIcon sx={{ color:'primary.main' }} />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            border: 'solid 1px',
            padding: '2px'
          }}>
            <SvgIcon component={TaskoIcon} fontSize='small' inheritViewBox sx={{ color:'primary.main', fontWeight: '700' }} />
            <Typography variant='span'
              sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}
            >Tasko</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined" startIcon={<LibraryAddIcon />}>Create</Button>
          </Box>

        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth: '120px' }} />
          <ModeSelect />
          <Tooltip title='Notifications'>
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
            </Badge>
          </Tooltip>

          <Tooltip title='Need to help'>
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }}/>
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar

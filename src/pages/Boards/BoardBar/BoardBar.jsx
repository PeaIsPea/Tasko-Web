
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import AutoModeIcon from '@mui/icons-material/AutoMode'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

import myavatar from '~/assets/avatar.png'

const MENU_STYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.taskoCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#e74c3c')
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="kimleephuc"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Driver"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AutoModeIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddAltIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              border: '2px solid white'
            }
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { color: 'white' }
            }
          }}>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
          <Tooltip title='kimleephuc'>
            <Avatar
              alt="kimleephuc"
              src={myavatar}
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
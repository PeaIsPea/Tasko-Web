import Box from '@mui/material/Box'
import { useState } from 'react'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
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
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

import { styled } from '@mui/material/styles'

//Custom Badge
const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    background: 'cyan'
  }
}))

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
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
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#d63031')
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <AppsIcon sx={{ color:'white' }} />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            padding: '2px'
          }}>
            <SvgIcon component={TaskoIcon} fontSize='small' inheritViewBox sx={{ color:'white', fontWeight: '700' }} />
            <Typography variant='span'
              sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
            >Tasko</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
              variant="outlined"
              startIcon={<LibraryAddIcon
              />}>
              Create</Button>
          </Box>

        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <TextField
            id="outlined-search"
            label="Search..."
            type="text"
            value={searchValue}
            onChange={(e) => (setSearchValue(e.target.value))}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'white' }}/>
                </InputAdornment>
              ),
              endAdornment: (
                <ClearIcon
                  fontSize='small'
                  sx={{
                    color: searchValue ? 'white': 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick= {() => (setSearchValue(''))}
                />
              )
            }}
            sx={{
              minWidth: '120px',
              maxWidth: '200px',
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white'
                },
                '&:hover fieldset': {
                  borderColor: 'white'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white'
                }
              }
            }} />

          <ModeSelect />
          <Tooltip title='Notifications'>
            <StyledBadge variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'white' }}/>
            </StyledBadge>
          </Tooltip>

          <Tooltip title='Need to help'>
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }}/>
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar

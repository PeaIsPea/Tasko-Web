import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - (${theme.taskoCustom.appBarHeight} + ${theme.taskoCustom.boardBarHeight}))`,
      display: 'flex',
      alignItems: 'center'
    }}>
      Board content
    </Box>
  )
}

export default BoardContent